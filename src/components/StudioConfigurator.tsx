'use client';
import { useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, Box, ImagePlus, Move3D, PackageOpen, Pause, Play, RotateCcw, X } from 'lucide-react';
import type { BoxConfig, BoxStyle, Board, Finish } from './BoxScene';
import { QuoteForm } from './QuoteForm';

const BoxScene = dynamic(() => import('./BoxScene'), { ssr: false, loading: () => <div className="grid h-full place-items-center"><div className="h-14 w-14 animate-spin rounded-full border-2 border-line border-t-brand" /></div> });

const styles: { id: BoxStyle; name: string; desc: string; dims: [number, number, number] }[] = [
  { id: 'mailer', name: 'Mailer box', desc: 'Self-locking, e-commerce favourite', dims: [25, 18, 8] },
  { id: 'shipping', name: 'Shipping carton', desc: 'Corrugated, four-flap', dims: [40, 30, 30] },
  { id: 'rigid', name: 'Rigid gift box', desc: 'Two-piece luxury box', dims: [24, 24, 10] },
  { id: 'carton', name: 'Folding carton', desc: 'Retail & cosmetics', dims: [8, 6, 18] },
];
const boards: Board[] = ['Printed colour', 'White board', 'Kraft'];
const finishes: Finish[] = ['Matte', 'Gloss', 'Soft-touch', 'Foil logo'];
const colors = [{ n: 'ALL PACK navy', c: '#2B3A8C' }, { n: 'Midnight', c: '#0E1838' }, { n: 'Sky', c: '#3A7FC0' }, { n: 'Forest', c: '#2F5D4F' }, { n: 'Blush', c: '#E7B3C3' }, { n: 'Sand', c: '#E8DCC6' }, { n: 'Crimson', c: '#A3253A' }, { n: 'Charcoal', c: '#2A2D34' }];

function Seg<T extends string>({ value, options, onChange, label }: { value: T; options: readonly T[]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="grid gap-1 rounded-2xl bg-soft p-1" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0,1fr))` }}>
      {options.map(o => (
        <button key={o} type="button" role="radio" aria-checked={value === o} onClick={() => onChange(o)} className={`rounded-xl px-2 py-2.5 text-[13px] font-medium transition-all ${value === o ? 'bg-white text-ink shadow-card' : 'text-muted hover:text-ink'}`}>{o}</button>
      ))}
    </div>
  );
}

export function StudioConfigurator() {
  const [cfg, setCfg] = useState<BoxConfig>({ style: 'mailer', length: 25, width: 18, height: 8, color: '#2B3A8C', board: 'Printed colour', finish: 'Matte', logo: null, open: false, autoRotate: true });
  const [quantity, setQuantity] = useState(500);
  const [logoName, setLogoName] = useState('');
  const [logoError, setLogoError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const set = <K extends keyof BoxConfig>(k: K, v: BoxConfig[K]) => setCfg(c => ({ ...c, [k]: v }));

  const style = styles.find(s => s.id === cfg.style)!;
  const colorName = colors.find(c => c.c.toLowerCase() === cfg.color.toLowerCase())?.n || cfg.color.toUpperCase();
  const spec = useMemo(() => `${style.name}, ${cfg.length} × ${cfg.width} × ${cfg.height} cm, ${cfg.board}${cfg.board === 'Printed colour' ? ` (${colorName})` : ''}, ${cfg.finish} finish, ${cfg.logo ? `custom logo (${logoName})` : 'logo to be supplied'}, approx. ${quantity.toLocaleString('en-US')} units`, [style, cfg, colorName, logoName, quantity]);

  function onLogo(f?: File) {
    setLogoError('');
    if (!f) return;
    if (!/^image\/(png|jpeg|svg\+xml|webp)$/.test(f.type)) { setLogoError('Use a PNG, JPG, SVG or WebP image.'); return; }
    if (f.size > 4 * 1024 * 1024) { setLogoError('Logo must be under 4 MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => { set('logo', String(reader.result)); setLogoName(f.name); };
    reader.readAsDataURL(f);
  }
  const dim = (k: 'length' | 'width' | 'height', label: string) => (
    <label className="block">
      <span className="mb-2 flex justify-between text-sm"><span className="font-medium">{label}</span><span className="tabular-nums text-muted">{cfg[k]} cm</span></span>
      <input type="range" min={4} max={80} value={cfg[k]} onChange={e => set(k, Number(e.target.value))} className="w-full accent-brand" aria-label={`${label} in centimetres`} />
    </label>
  );

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
        <div className="relative h-[460px] overflow-hidden rounded-5xl border border-line bg-[radial-gradient(120%_90%_at_50%_0%,#fff,#EEF2F8_55%,#DFE6F1)] sm:h-[600px] lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:min-h-[560px]">
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
          <BoxScene cfg={cfg} />
          <div className="pointer-events-none absolute left-5 top-5 rounded-2xl bg-white/80 px-4 py-3 shadow-card backdrop-blur">
            <p className="text-xs text-muted">Live preview</p>
            <p className="font-display font-semibold">{style.name}</p>
          </div>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/85 p-1.5 shadow-lift backdrop-blur">
            <button type="button" onClick={() => set('open', !cfg.open)} className="btn-ghost btn-sm !min-h-9" aria-pressed={cfg.open}>{cfg.open ? <Box size={16} /> : <PackageOpen size={16} />} {cfg.open ? 'Close' : 'Open'}</button>
            <button type="button" onClick={() => set('autoRotate', !cfg.autoRotate)} className="btn-ghost btn-sm !min-h-9" aria-pressed={cfg.autoRotate}>{cfg.autoRotate ? <Pause size={16} /> : <Play size={16} />} Spin</button>
            <span className="hidden items-center gap-1.5 px-3 text-xs text-muted sm:flex"><Move3D size={14} /> Drag to rotate</span>
          </div>
        </div>

        <div className="space-y-4">
          <section className="card p-5 sm:p-6">
            <h2 className="mb-4 text-sm font-semibold">1 · Box style</h2>
            <div className="grid grid-cols-2 gap-2">
              {styles.map(s => (
                <button key={s.id} type="button" aria-pressed={cfg.style === s.id}
                  onClick={() => setCfg(c => ({ ...c, style: s.id, length: s.dims[0], width: s.dims[1], height: s.dims[2], board: s.id === 'shipping' ? 'Kraft' : c.board === 'Kraft' ? 'Printed colour' : c.board }))}
                  className={`rounded-2xl border p-3 text-left transition-all ${cfg.style === s.id ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink/30'}`}>
                  <span className="block text-sm font-semibold">{s.name}</span>
                  <span className={`block text-xs ${cfg.style === s.id ? 'text-white/60' : 'text-muted'}`}>{s.desc}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="card space-y-4 p-5 sm:p-6">
            <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">2 · Dimensions</h2><button type="button" onClick={() => setCfg(c => ({ ...c, length: style.dims[0], width: style.dims[1], height: style.dims[2] }))} className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink"><RotateCcw size={12} /> Reset</button></div>
            {dim('length', 'Length')}{dim('width', 'Width')}{dim('height', 'Height')}
          </section>

          <section className="card space-y-4 p-5 sm:p-6">
            <h2 className="text-sm font-semibold">3 · Material & colour</h2>
            <Seg label="Board" value={cfg.board} options={boards} onChange={v => set('board', v)} />
            {cfg.board === 'Printed colour' && (
              <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Colour">
                {colors.map(c => (
                  <button key={c.c} type="button" role="radio" aria-checked={cfg.color === c.c} aria-label={c.n} title={c.n} onClick={() => set('color', c.c)}
                    className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 ${cfg.color === c.c ? 'border-white ring-2 ring-ink' : 'border-white shadow-card'}`} style={{ background: c.c }} />
                ))}
                <label className="relative grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-dashed border-ink/30 text-xs text-muted" title="Custom colour">
                  +<input type="color" value={cfg.color} onChange={e => set('color', e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" aria-label="Custom colour" />
                </label>
              </div>
            )}
            <div><p className="mb-2 text-sm font-medium">Finish</p><Seg label="Finish" value={cfg.finish} options={finishes} onChange={v => set('finish', v)} /></div>
          </section>

          <section className="card space-y-4 p-5 sm:p-6">
            <h2 className="text-sm font-semibold">4 · Your logo</h2>
            {cfg.logo ? (
              <div className="flex items-center gap-3 rounded-2xl bg-soft p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cfg.logo} alt="Your uploaded logo" className="h-12 w-12 rounded-lg bg-white object-contain p-1" />
                <span className="min-w-0 flex-1 truncate text-sm">{logoName}</span>
                <button type="button" onClick={() => { set('logo', null); setLogoName(''); if (fileRef.current) fileRef.current.value = ''; }} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white" aria-label="Remove logo"><X size={15} /></button>
              </div>
            ) : (
              <button type="button" onClick={() => fileRef.current?.click()} className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-line p-4 text-left transition-colors hover:border-brand hover:bg-mist">
                <ImagePlus size={22} className="text-brand" />
                <span><span className="block text-sm font-semibold">Try your own logo</span><span className="text-xs text-muted">PNG with transparency works best. Stays on your device.</span></span>
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" className="sr-only" aria-label="Upload logo" onChange={e => onLogo(e.target.files?.[0])} />
            {logoError && <p role="alert" className="text-xs text-rose-600">{logoError}</p>}
          </section>

          <section className="card space-y-4 p-5 sm:p-6">
            <label className="block">
              <span className="mb-2 flex justify-between text-sm"><span className="font-semibold">5 · Quantity</span><span className="tabular-nums text-muted">{quantity.toLocaleString('en-US')} units</span></span>
              <input type="range" min={100} max={20000} step={100} value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full accent-brand" aria-label="Quantity" />
            </label>
          </section>

          <div className="rounded-4xl bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-white/50">Your specification</p>
            <p className="mt-3 text-sm leading-relaxed text-white/85">{spec}</p>
            <a href="#studio-quote" className="btn-white mt-5 w-full">Get a quote for this design <ArrowDown size={16} /></a>
          </div>
        </div>
      </div>

      <section id="studio-quote" className="mx-auto mt-24 max-w-4xl scroll-mt-28">
        <div className="mb-8 text-center">
          <p className="kicker mb-4">Send your design</p>
          <h2 className="h-section !text-[clamp(2rem,3.8vw,3.2rem)]">Love it? Let&apos;s <span className="accent">make it.</span></h2>
          <p className="lead mx-auto mt-4 max-w-xl">Your studio specification is attached automatically.{cfg.logo ? ' Remember to upload your logo file below so we can print it.' : ''}</p>
        </div>
        <QuoteForm studioSpec={spec} />
      </section>
    </div>
  );
}
