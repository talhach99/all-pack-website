import Link from 'next/link';

type Copy = Record<string, string>;
type Contact = { wa: string | null; waUS: string | null; usPhone: string; pkPhone: string; email: string };

const lines = (s: string) => (s || '').split('\n').map(l => l.trim()).filter(Boolean);

const Check = ({ c }: { c: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-[3px] shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
);
const Pin = ({ c }: { c: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);

/** The two office cards: Lahore headquarters (navy) and the Boston US office (white). */
export function OfficeCards({ t, c }: { t: Copy; c: Contact }) {
  const offices = [
    { hq: true, badge: t['offices.lahore.badge'], city: 'Lahore', place: 'Punjab, Pakistan', role: t['offices.lahore.role'], text: t['offices.lahore.text'], points: lines(t['offices.lahore.points']), meta: [['Serves', 'Pakistan'], ['Quotes in', 'PKR'], ['Time zone', 'PKT (UTC+5)']], wa: c.wa, phone: c.pkPhone },
    { hq: false, badge: t['offices.boston.badge'], city: 'Boston', place: 'Massachusetts, USA', role: t['offices.boston.role'], text: t['offices.boston.text'], points: lines(t['offices.boston.points']), meta: [['Serves', 'United States'], ['Quotes in', 'USD'], ['Time zone', 'Eastern (ET)']], wa: c.waUS, phone: c.usPhone },
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {offices.map(o => {
        const dark = o.hq;
        return (
          <article key={o.city} className={`ap-lift flex flex-col rounded-[24px] p-7 sm:p-10 ${dark ? 'bg-[#0A208C] text-white' : 'border border-[#E3E6ED] bg-white'}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className={`rounded-full px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-[.08em] ${dark ? 'bg-[#22C3EE] text-[#0A208C]' : 'bg-[#ECEFFD] text-[#0A208C]'}`}>{o.badge}</span>
              <span className={`inline-flex items-center gap-1.5 text-[14px] font-semibold ${dark ? 'text-[#C8D0F5]' : 'text-[#5C6272]'}`}><Pin c={dark ? '#22C3EE' : '#2B43F0'} />{o.place}</span>
            </div>
            <h3 className={`mt-7 text-[44px] leading-none tracking-[-.03em] sm:text-[56px] ${dark ? '!text-white' : ''}`}>{o.city}</h3>
            <p className={`mt-3 text-[18px] font-bold ${dark ? 'text-[#22C3EE]' : 'text-[#2B43F0]'}`}>{o.role}</p>
            <p className={`mt-3 text-[16px] leading-[1.65] ${dark ? 'text-[#DCE2FA]' : 'text-[#4A5060]'}`}>{o.text}</p>
            {o.points.length > 0 && (
              <ul className="mt-6 grid gap-2.5">
                {o.points.map(p => <li key={p} className={`flex gap-2.5 text-[15px] leading-[1.5] ${dark ? 'text-white' : 'text-[#0B0D12]'}`}><Check c={dark ? '#22C3EE' : '#2B43F0'} />{p}</li>)}
              </ul>
            )}
            <dl className={`mt-8 grid grid-cols-3 gap-4 border-t pt-6 ${dark ? 'border-white/15' : 'border-[#EDEEF1]'}`}>
              {o.meta.map(([k, v]) => <div key={k}><dt className={`text-[12px] font-bold uppercase tracking-[.08em] ${dark ? 'text-[#A9B6EC]' : 'text-[#7A8091]'}`}>{k}</dt><dd className="mt-1 text-[15px] font-extrabold">{v}</dd></div>)}
            </dl>
            <div className="mt-auto flex flex-wrap gap-2.5 pt-8">
              {o.wa && <a href={o.wa} target="_blank" rel="noopener noreferrer" className={`ap-btn !min-h-[46px] text-[14px] ${dark ? 'ap-white' : 'ap-dark'}`}>WhatsApp {o.phone}</a>}
              <a href={`mailto:${c.email}`} className={`ap-btn !min-h-[46px] text-[14px] ${dark ? 'ap-ghost-light' : 'ap-ghost'}`}>Email {o.city}</a>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** How an order moves between the two offices, as three connected steps. */
export function OfficeFlow({ t }: { t: Copy }) {
  const steps = [1, 2, 3].map(n => ({ n, title: t[`offices.step${n}.title`], text: t[`offices.step${n}.text`] }));
  return (
    <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
      <span aria-hidden="true" className="absolute left-[22px] right-[22px] top-[22px] hidden h-px bg-[#D5DAE6] md:block" />
      {steps.map(s => (
        <li key={s.n} className="relative flex flex-col gap-3">
          <span className="relative grid h-11 w-11 place-items-center rounded-full border border-[#D5DAE6] bg-white text-[14px] font-extrabold text-[#0A208C]">0{s.n}</span>
          <h3 className="text-[19px]">{s.title}</h3>
          <p className="text-[15px] leading-[1.6] text-[#5C6272]">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Homepage offices section: headline, both office cards and how they work together. */
export function OfficesSection({ t, c }: { t: Copy; c: Contact }) {
  return (
    <section id="offices" className="scroll-mt-24 bg-[#F4F5F8] px-5 py-20 sm:py-28">
      <div className="ap-rv mx-auto max-w-[1200px]">
        <div className="mb-12 grid items-end gap-6 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div><span className="ap-kicker">{t['offices.kicker']}</span><h2 className="mt-3 text-[36px] leading-[1.04] sm:text-[52px]">{t['offices.title']}</h2></div>
          <div className="flex flex-col items-start gap-4"><p className="text-[17px] leading-[1.65] text-[#4A5060]">{t['offices.lead']}</p><Link href="/offices" className="ap-ul font-bold">About our offices <span aria-hidden="true">→</span></Link></div>
        </div>
        <OfficeCards t={t} c={c} />
        <div className="mt-14 rounded-[24px] border border-[#E3E6ED] bg-white p-7 sm:p-10">
          <p className="mb-8 text-[13px] font-extrabold uppercase tracking-[.1em] text-[#0A208C]">{t['offices.flow.title']}</p>
          <OfficeFlow t={t} />
        </div>
      </div>
    </section>
  );
}
