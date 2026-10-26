import type { Metadata } from 'next';
import { StudioConfigurator } from '@/components/StudioConfigurator';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: '3D Packaging Studio',
  description: 'Design your custom box in 3D: choose a style, size, board, colour and finish, try your own logo, then send the specification to ALL PACK for a quote.',
  alternates: { canonical: '/studio' },
};

export default function StudioPage() {
  return (
    <main className="pb-28 pt-12 sm:pt-16">
      <div className="container-x">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="kicker mb-6">3D Studio</p>
            <h1 className="h-display !text-[clamp(2.6rem,5.6vw,5rem)]">Design it. <span className="accent">Spin it.</span> Send it.</h1>
          </div>
          <p className="lead max-w-md">Shape your box in real time, then send the specification straight to our team for an accurate quote.</p>
        </Reveal>
        <StudioConfigurator />
      </div>
    </main>
  );
}
