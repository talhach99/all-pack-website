import { authConfigured, isAdmin } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { AdminApp } from '@/components/admin/AdminApp';
import { Login } from '@/components/admin/Login';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!authConfigured()) {
    return (
      <main className="grid min-h-screen place-items-center bg-mist px-4">
        <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-7 shadow-lift">
          <p className="font-display text-[22px] font-semibold text-navy">Admin is not set up yet</p>
          <p className="mt-3 text-[15px] leading-relaxed text-secondary">Choose your admin ID and password in Cloudflare: Workers → all-pack-website → Settings → Variables and secrets. Add <b>ADMIN_USERNAME</b> and <b>ADMIN_PASSWORD</b> (as secrets), then reload this page.</p>
        </div>
      </main>
    );
  }
  if (!(await isAdmin())) return <Login />;
  void (await getDb().catch(() => null));
  return <AdminApp />;
}
