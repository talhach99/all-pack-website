/** Flat dieline of a tuck-end carton: solid lines are cuts, dashed lines are folds. Decorative. */
export function Dieline({ className = '' }: { className?: string }) {
  const cut = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2 } as const;
  const fold = { fill: 'none', stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '5 4' } as const;
  return (
    <svg viewBox="-10 -10 350 300" className={className} aria-hidden="true">
      {/* outer cut */}
      <path {...cut} d="M20 70 L4 78 L4 192 L20 200 L20 270 Q20 278 28 278 L102 278 Q110 278 110 270 L110 200 L116 228 L164 228 L170 200 L170 200 L260 200 L266 228 L314 228 L320 200 L320 70 L314 42 L266 42 L260 70 L260 10 Q260 0 250 0 L180 0 Q170 0 170 10 L170 70 L164 42 L116 42 L110 70 Z" />
      {/* folds */}
      <path {...fold} d="M20 70 L20 200 M110 70 L110 200 M170 70 L170 200 M260 70 L260 200 M20 70 L320 70 M20 200 L320 200" />
      {/* tuck fold lines */}
      <path {...fold} d="M178 18 L252 18 M28 262 L102 262" />
      {/* registration */}
      <g stroke="currentColor" strokeWidth="1" fill="none"><circle cx="330" cy="-2" r="6" /><path d="M330 -12 V8 M320 -2 H340" /></g>
    </svg>
  );
}
