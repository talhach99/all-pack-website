'use client';
import { useState } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from 'lucide-react';
import type { CollectionDef, Field } from './schema';
import { newItem } from './schema';
import { ImageField } from './Media';
import { btnDanger, btnDark, btnLine, inputCls, Label, SaveBar } from './ui';

type Obj = Record<string, unknown>;

/** Text area that edits a list of strings, one per line. Keeps raw text while typing so blank lines are not lost. */
function Lines({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [raw, setRaw] = useState(value.join('\n'));
  return <textarea className={inputCls} rows={Math.min(10, Math.max(3, value.length + 1))} value={raw} onChange={e => { setRaw(e.target.value); onChange(e.target.value.split('\n').map(s => s.trim()).filter(Boolean)); }} />;
}

function Move({ i, n, onMove, onDelete }: { i: number; n: number; onMove: (d: -1 | 1) => void; onDelete: () => void }) {
  const [sure, setSure] = useState(false);
  const b = 'grid h-8 w-8 place-items-center rounded-lg border border-line bg-white hover:border-navy disabled:opacity-30';
  return (
    <span className="flex shrink-0 items-center gap-1" onClick={e => e.stopPropagation()}>
      <button type="button" aria-label="Move up" disabled={i === 0} className={b} onClick={() => onMove(-1)}><ArrowUp size={14} /></button>
      <button type="button" aria-label="Move down" disabled={i === n - 1} className={b} onClick={() => onMove(1)}><ArrowDown size={14} /></button>
      {sure ? <><button type="button" className={`${btnDanger} !px-2.5 !py-1.5 text-[12px]`} onClick={onDelete}>Delete</button><button type="button" className={`${btnLine} !px-2.5 !py-1.5 text-[12px]`} onClick={() => setSure(false)}>Keep</button></>
        : <button type="button" aria-label="Delete" className={`${b} text-red-600`} onClick={() => setSure(true)}><Trash2 size={14} /></button>}
    </span>
  );
}

function move<T>(list: T[], i: number, d: -1 | 1): T[] { const a = [...list]; const j = i + d; if (j < 0 || j >= a.length) return a; [a[i], a[j]] = [a[j], a[i]]; return a; }

export function FieldEditor({ f, value, onChange, titleOf }: { f: Field; value: unknown; onChange: (v: unknown) => void; titleOf?: string }) {
  switch (f.t) {
    case 'text': return <label className="block"><Label hint={f.hint}>{f.label}</Label><input className={inputCls} value={String(value ?? '')} onChange={e => onChange(e.target.value)} /></label>;
    case 'long': return <label className="block"><Label hint={f.hint}>{f.label}</Label><textarea className={inputCls} rows={Math.min(12, Math.max(3, Math.ceil(String(value ?? '').length / 80) + 1))} value={String(value ?? '')} onChange={e => onChange(e.target.value)} /></label>;
    case 'bool': return <label className="flex items-center gap-2.5 text-[14px]"><input type="checkbox" className="h-4 w-4" checked={!!value} onChange={e => onChange(e.target.checked)} />{f.label}</label>;
    case 'select': return <label className="block"><Label>{f.label}</Label><select className={inputCls} value={String(value ?? '')} onChange={e => onChange(e.target.value)}>{f.options!.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>;
    case 'image': return <div><Label>{f.label}</Label><ImageField value={String(value ?? '')} onChange={onChange} hint={f.hint} /></div>;
    case 'lines': return <div><Label hint={f.hint}>{f.label}</Label><Lines value={Array.isArray(value) ? (value as string[]) : []} onChange={onChange} /></div>;
    case 'group': return (
      <fieldset className="grid gap-4 rounded-xl border border-line p-4"><legend className="px-1 text-[13px] font-semibold">{f.label}</legend>
        {f.fields!.map(g => <FieldEditor key={g.k} f={g} value={(value as Obj)?.[g.k]} onChange={v => onChange({ ...(value as Obj), [g.k]: v })} />)}
      </fieldset>);
    case 'blocks': return <BlocksEditor value={(value as Block[]) ?? []} onChange={onChange} />;
    case 'array': return <ArrayEditor f={f} value={(value as Obj[]) ?? []} onChange={onChange} titleOf={titleOf} />;
  }
}

function ArrayEditor({ f, value, onChange }: { f: Field; value: Obj[]; onChange: (v: Obj[]) => void; titleOf?: string }) {
  const first = f.fields![0].k;
  return (
    <div>
      <Label>{f.label}</Label>
      <div className="grid gap-3">
        {value.map((it, i) => (
          <details key={i} className="rounded-xl border border-line bg-mist/50" open={value.length <= 2}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3"><span className="min-w-0 truncate text-[14px] font-semibold">{i + 1}. {String(it[first] || `New ${f.item}`)}</span><Move i={i} n={value.length} onMove={d => onChange(move(value, i, d))} onDelete={() => onChange(value.filter((_, j) => j !== i))} /></summary>
            <div className="grid gap-4 border-t border-line bg-white p-4">{f.fields!.map(g => <FieldEditor key={g.k} f={g} value={it[g.k]} onChange={v => onChange(value.map((x, j) => (j === i ? { ...x, [g.k]: v } : x)))} />)}</div>
          </details>
        ))}
      </div>
      <button type="button" className={`${btnLine} mt-3`} onClick={() => onChange([...value, newItem(f.fields!)])}><Plus size={15} /> Add {f.item}</button>
    </div>
  );
}

export type Block = string | { ul: string[] } | { ol: string[] } | { table: { head: string[]; rows: string[][]; caption?: string } } | { img: { src: string; alt: string; width: number; height: number; caption: string } }
  | { tip: { title: string; text: string } } | { quote: string } | { steps: { title: string; text: string }[] };

/** Steps are edited as one line each: "Title | explanation". */
const stepsToLines = (v: { title: string; text: string }[]) => v.map(s => `${s.title} | ${s.text}`);
const linesToSteps = (v: string[]) => v.map(l => { const [title, ...rest] = l.split('|'); return { title: (title ?? '').trim(), text: rest.join('|').trim() }; });

function BlocksEditor({ value, onChange }: { value: Block[]; onChange: (v: Block[]) => void }) {
  const set = (i: number, b: Block) => onChange(value.map((x, j) => (j === i ? b : x)));
  return (
    <div>
      <Label hint="Links: write [text](/page) or [text](https://…). Bold: **text**">Content</Label>
      <div className="grid gap-3">
        {value.map((b, i) => {
          const kind = typeof b === 'string' ? 'Paragraph' : 'ul' in b ? 'Bullet list' : 'ol' in b ? 'Numbered list' : 'table' in b ? 'Table' : 'tip' in b ? 'Tip box' : 'quote' in b ? 'Highlighted quote' : 'steps' in b ? 'Process steps' : 'Picture';
          return (
            <div key={i} className="rounded-xl border border-line bg-white p-3">
              <div className="mb-2 flex items-center justify-between gap-2"><span className="text-[12px] font-semibold uppercase tracking-wide text-muted">{kind}</span><Move i={i} n={value.length} onMove={d => onChange(move(value, i, d))} onDelete={() => onChange(value.filter((_, j) => j !== i))} /></div>
              {typeof b === 'string' ? <textarea className={inputCls} rows={Math.min(10, Math.max(3, Math.ceil(b.length / 90)))} value={b} onChange={e => set(i, e.target.value)} />
                : 'ul' in b ? <Lines value={b.ul} onChange={v => set(i, { ul: v })} />
                : 'ol' in b ? <Lines value={b.ol} onChange={v => set(i, { ol: v })} />
                : 'table' in b ? <TableJson value={b.table} onChange={t => set(i, { table: t })} />
                : 'tip' in b ? (<div className="grid gap-3">
                    <label className="block"><Label>Tip title</Label><input className={inputCls} value={b.tip.title} onChange={e => set(i, { tip: { ...b.tip, title: e.target.value } })} /></label>
                    <label className="block"><Label>Tip text</Label><textarea className={inputCls} rows={3} value={b.tip.text} onChange={e => set(i, { tip: { ...b.tip, text: e.target.value } })} /></label>
                  </div>)
                : 'quote' in b ? <textarea className={inputCls} rows={2} value={b.quote} onChange={e => set(i, { quote: e.target.value })} />
                : 'steps' in b ? (<div><Label hint="One step per line: Title | short explanation">Steps</Label><Lines value={stepsToLines(b.steps)} onChange={v => set(i, { steps: linesToSteps(v) })} /></div>)
                : (<div className="grid gap-3">
                    <ImageField value={b.img.src} onChange={v => set(i, { img: { ...b.img, src: v } })} />
                    <label className="block"><Label>Picture description</Label><input className={inputCls} value={b.img.alt} onChange={e => set(i, { img: { ...b.img, alt: e.target.value } })} /></label>
                    <label className="block"><Label>Caption</Label><input className={inputCls} value={b.img.caption} onChange={e => set(i, { img: { ...b.img, caption: e.target.value } })} /></label>
                  </div>)}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className={btnLine} onClick={() => onChange([...value, ''])}><Plus size={14} /> Paragraph</button>
        <button type="button" className={btnLine} onClick={() => onChange([...value, { ul: [] }])}><Plus size={14} /> Bullet list</button>
        <button type="button" className={btnLine} onClick={() => onChange([...value, { ol: [] }])}><Plus size={14} /> Numbered list</button>
        <button type="button" className={btnLine} onClick={() => onChange([...value, { tip: { title: '', text: '' } }])}><Plus size={14} /> Tip box</button>
        <button type="button" className={btnLine} onClick={() => onChange([...value, { quote: '' }])}><Plus size={14} /> Quote</button>
        <button type="button" className={btnLine} onClick={() => onChange([...value, { steps: [] }])}><Plus size={14} /> Steps</button>
        <button type="button" className={btnLine} onClick={() => onChange([...value, { img: { src: '', alt: '', width: 1600, height: 1000, caption: '' } }])}><Plus size={14} /> Picture</button>
      </div>
    </div>
  );
}

/** Tables are edited as simple text: one row per line, cells separated by " | ". First line is the heading row. */
function TableJson({ value, onChange }: { value: { head: string[]; rows: string[][]; caption?: string }; onChange: (v: { head: string[]; rows: string[][]; caption?: string }) => void }) {
  const toText = () => [value.head, ...value.rows].map(r => r.join(' | ')).join('\n');
  const [raw, setRaw] = useState(toText());
  return (
    <div className="grid gap-2">
      <label className="block"><Label>Caption</Label><input className={inputCls} value={value.caption ?? ''} onChange={e => onChange({ ...value, caption: e.target.value })} /></label>
      <label className="block"><Label hint="One row per line, cells separated by | . First line is the heading.">Table</Label>
        <textarea className={`${inputCls} font-mono text-[13px]`} rows={Math.min(14, value.rows.length + 3)} value={raw} onChange={e => {
          setRaw(e.target.value);
          const rows = e.target.value.split('\n').filter(l => l.trim()).map(l => l.split('|').map(c => c.trim()));
          if (rows.length) onChange({ ...value, head: rows[0], rows: rows.slice(1) });
        }} /></label>
    </div>
  );
}

/** Editor for one whole list (all products, all FAQs …). Items open/close; save writes the entire list. */
export function CollectionEditor({ def, items, isCustom, onSave, onReset, saving }: { def: CollectionDef; items: Obj[]; isCustom: boolean; onSave: (v: Obj[]) => Promise<boolean>; onReset: () => void; saving: boolean }) {
  const [list, setList] = useState<Obj[]>(items);
  const [dirty, setDirty] = useState(false);
  const upd = (v: Obj[]) => { setList(v); setDirty(true); };
  return (
    <div>
      <p className="mb-6 max-w-3xl text-[15px] text-secondary">{def.intro}</p>
      <div className="grid gap-3">
        {list.map((it, i) => (
          <details key={i} className="rounded-xl border border-line bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5">
              <span className="flex min-w-0 items-center gap-2"><ChevronDown size={16} className="shrink-0 text-muted" /><span className="truncate text-[15px] font-semibold">{i + 1}. {String(it[def.titleOf] || `New ${def.itemName}`)}{it.hidden ? <span className="ml-2 font-normal text-muted">(hidden)</span> : null}</span></span>
              <Move i={i} n={list.length} onMove={d => upd(move(list, i, d))} onDelete={() => upd(list.filter((_, j) => j !== i))} />
            </summary>
            <div className="grid gap-5 border-t border-line p-4 sm:p-5">{def.fields.map(f => <FieldEditor key={f.k} f={f} value={it[f.k]} onChange={v => upd(list.map((x, j) => (j === i ? { ...x, [f.k]: v } : x)))} />)}</div>
          </details>
        ))}
        {list.length === 0 && <p className="rounded-xl border border-dashed border-line p-8 text-center text-[15px] text-muted">Nothing here yet.</p>}
      </div>
      <button type="button" className={`${btnDark} mt-4`} onClick={() => upd([...list, newItem(def.fields)])}><Plus size={16} /> Add {def.itemName}</button>
      <SaveBar dirty={dirty} saving={saving} onSave={async () => { if (await onSave(list)) setDirty(false); }} onReset={isCustom ? onReset : undefined} resetLabel="Restore original list" />
    </div>
  );
}
