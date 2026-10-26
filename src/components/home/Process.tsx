import { Reveal } from '../Reveal';

const steps = [
  { title: 'Share your brief', text: 'Tell us what you are packing, the quantity and the feeling you want. A photo and rough size is enough to start.' },
  { title: 'We engineer the pack', text: 'We recommend structure, board and finish, then send a clear specification and quotation for approval.' },
  { title: 'Print & finish', text: 'Once artwork is approved, your packaging moves into print, finishing, cutting and assembly.' },
  { title: 'Ready for your product', text: 'Your finished order is packed and handed over, ready for your product and your customers.' },
];

export function Process() {
  return (
    <section className="section" id="process">
      <div className="container-x">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="kicker">How it works</p>
            <h2 className="h-section mt-6 max-w-[15ch]">From idea to box in four <span className="accent">steps.</span></h2>
          </Reveal>
          <Reveal delay={.1}><p className="lead max-w-[40ch]">No minimum guesswork, no confusing jargon. A clear specification and a clear price before anything is printed.</p></Reveal>
        </div>
        <ol className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * .07} className={`py-10 sm:pr-8 ${i ? 'border-t border-line sm:border-t-0' : ''} ${i % 2 ? 'sm:border-l sm:pl-8' : ''} ${i >= 2 ? 'sm:border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-8' : ''}`}>
              <span className="outline-text block font-display text-[5rem] font-light leading-none text-brass">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-6 text-[11.5px] font-bold uppercase tracking-[.2em] text-brass">Step {String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-display text-[1.7rem] font-normal leading-tight">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
