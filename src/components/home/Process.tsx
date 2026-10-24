import { MessageSquareText, PencilRuler, Printer, Truck } from 'lucide-react';
import { Reveal } from '../Reveal';

const steps = [
  { icon: MessageSquareText, title: 'Share your brief', text: 'Tell us what you are packing, the quantity and the feeling you want. A photo and rough size is enough to start.' },
  { icon: PencilRuler, title: 'We engineer the pack', text: 'We recommend structure, board and finish, then send a clear specification and quotation for approval.' },
  { icon: Printer, title: 'Print & finish', text: 'Once artwork is approved, your packaging moves into print, finishing, cutting and assembly.' },
  { icon: Truck, title: 'Ready for your product', text: 'Your finished order is packed and handed over, ready for your product and your customers.' },
];

export function Process() {
  return (
    <section className="section bg-white">
      <div className="container-x grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="kicker mb-5">How it works</p>
            <h2 className="h-section">From idea to <span className="accent">box</span> in four steps.</h2>
            <p className="lead mt-6 max-w-md">No minimum guesswork, no confusing jargon. A clear specification and a clear price before anything is printed.</p>
          </Reveal>
        </div>
        <ol className="relative space-y-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * .05} className="group relative overflow-hidden rounded-4xl border border-line bg-paper p-7 transition-colors duration-500 hover:bg-mist sm:p-9">
              <span className="pointer-events-none absolute -right-2 -top-8 font-display text-[9rem] font-bold leading-none tracking-tighter text-ink/[.04] transition-colors duration-500 group-hover:text-brand/10">{i + 1}</span>
              <div className="relative flex items-start gap-6">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink text-white transition-transform duration-500 group-hover:-rotate-6 group-hover:bg-brand"><s.icon size={24} /></span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.18em] text-sky">Step {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
