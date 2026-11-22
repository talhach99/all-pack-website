import { getCloudflareContext } from '@opennextjs/cloudflare';

/** The small slice of the Cloudflare D1 API this site uses. */
export interface D1Stmt {
  bind(...values: unknown[]): D1Stmt;
  run(): Promise<unknown>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
}
export interface D1 {
  prepare(sql: string): D1Stmt;
  batch(stmts: D1Stmt[]): Promise<unknown[]>;
}

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT, created_at INTEGER NOT NULL,
    name TEXT NOT NULL, email TEXT NOT NULL, whatsapp TEXT NOT NULL, message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new', note TEXT NOT NULL DEFAULT '', source TEXT NOT NULL DEFAULT '', ip_hash TEXT NOT NULL DEFAULT '')`,
  `CREATE INDEX IF NOT EXISTS enquiries_created ON enquiries (created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS media (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, mime TEXT NOT NULL, size INTEGER NOT NULL, data BLOB NOT NULL, created_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS attempts (id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, who TEXT NOT NULL, at INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS attempts_lookup ON attempts (kind, who, at)`,
];

let ready: Promise<void> | null = null;

/** Returns the D1 database, creating the tables on first use. Null when the DB binding is not configured. */
export async function getDb(): Promise<D1 | null> {
  let db: D1 | undefined;
  try { db = (getCloudflareContext().env as unknown as { DB?: D1 }).DB; } catch { db = undefined; }
  if (!db) return null;
  const d = db;
  ready ??= d.batch(SCHEMA.map(s => d.prepare(s))).then(() => undefined, e => { ready = null; throw e; });
  await ready;
  return d;
}

export function envVar(name: string): string {
  try { return String((getCloudflareContext().env as unknown as Record<string, unknown>)[name] ?? process.env[name] ?? ''); } catch { return process.env[name] ?? ''; }
}

export async function kvGet<T>(key: string): Promise<T | null> {
  const db = await getDb();
  if (!db) return null;
  const row = await db.prepare('SELECT value FROM kv WHERE key = ?').bind(key).first<{ value: string }>();
  if (!row) return null;
  try { return JSON.parse(row.value) as T; } catch { return null; }
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database is not connected');
  await db.prepare('INSERT INTO kv (key, value, updated_at) VALUES (?1, ?2, ?3) ON CONFLICT(key) DO UPDATE SET value = ?2, updated_at = ?3').bind(key, JSON.stringify(value), Date.now()).run();
}
