import { Factory } from 'lucide-react';
import { getSite } from '@/lib/site';
import { CertBadge } from './Certifications';

/** The four proof points: certifications, years in production and in-house manufacturing. */
export async function Reasons() {
  const { reasons } = await getSite();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {reasons.map(r => (
        <div key={r.title} className="card p-7">
          {r.badge === 'iso' || r.badge === 'halal'
            ? <CertBadge id={r.badge} size={56} />
            : <span className="grid h-14 w-14 place-items-center rounded-full bg-navy font-display text-[16px] font-bold text-white">{r.badge === '25+' ? <span data-count="25" data-suffix="+">25+</span> : <Factory size={22} strokeWidth={1.75} aria-hidden="true" />}</span>}
          <h3 className="mt-6 text-[19px]">{r.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-secondary">{r.text}</p>
        </div>
      ))}
    </div>
  );
}
