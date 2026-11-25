import Link from 'next/link';

/** Hero aside for policy pages: last update and where to ask questions. */
export function PolicyCard({ email }: { email: string }) {
  return (
    <div className="ml-auto w-full max-w-[400px] rounded-[24px] bg-white p-7 shadow-[0_30px_60px_-35px_rgba(60,45,20,.35)]">
      <span className="text-[12px] font-extrabold uppercase tracking-[.1em] text-[#0A208C]">Last updated</span>
      <p className="mt-1 text-[22px] font-extrabold">November 2026</p>
      <div className="my-5 h-px bg-[#E6E8EE]" />
      <p className="text-[15px] leading-[1.6] text-[#4A5060]">Questions about this policy? Email <a href={`mailto:${email}`} className="ap-ul font-bold text-[#0B0D12] [overflow-wrap:anywhere]">{email}</a>.</p>
      <div className="mt-5 flex flex-wrap gap-2 text-[13px] font-bold">
        {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Shipping', '/shipping']].map(([t, h]) => <Link key={h} href={h} className="rounded-full border border-[#E0E3EA] px-3 py-1.5 hover:border-[#2B43F0] hover:text-[#2B43F0]">{t}</Link>)}
      </div>
    </div>
  );
}
