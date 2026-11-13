/**
 * ALL PACK's certifications. Clean in-house badges for now; swap for the
 * certifying bodies' official marks (with certificate numbers) when supplied.
 */
export const certifications = [
  { id: 'iso', name: 'ISO 9001:2015', d: 'Certified quality management' },
  { id: 'halal', name: 'Halal certified', d: 'Food-contact packaging' },
] as const;

export function CertBadge({ id, size = 72 }: { id: 'iso' | 'halal'; size?: number }) {
  if (id === 'iso') {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" role="img" aria-label="ISO 9001 certified">
        <circle cx="40" cy="40" r="38" fill="#0B1F4D" />
        <circle cx="40" cy="40" r="31" fill="none" stroke="#A9B8FF" strokeWidth="1.2" />
        <text x="40" y="37" textAnchor="middle" fontFamily="Inter Variable, Inter, sans-serif" fontWeight="700" fontSize="15" fill="#fff" letterSpacing=".5">ISO</text>
        <text x="40" y="53" textAnchor="middle" fontFamily="Inter Variable, Inter, sans-serif" fontWeight="600" fontSize="14" fill="#fff">9001</text>
        <text x="40" y="20" textAnchor="middle" fontFamily="Inter Variable, Inter, sans-serif" fontWeight="600" fontSize="5.6" fill="#A9B8FF" letterSpacing="1">CERTIFIED</text>
        <text x="40" y="65" textAnchor="middle" fontFamily="Inter Variable, Inter, sans-serif" fontWeight="600" fontSize="5.6" fill="#A9B8FF" letterSpacing="1">2015</text>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" role="img" aria-label="Halal certified">
      <circle cx="40" cy="40" r="38" fill="#1F6B45" />
      <circle cx="40" cy="40" r="31" fill="none" stroke="#BFE3CC" strokeWidth="1.2" />
      <text x="40" y="44" textAnchor="middle" fontFamily="'Noto Naskh Arabic', 'Geeza Pro', 'Arial', sans-serif" fontWeight="700" fontSize="20" fill="#fff">حلال</text>
      <text x="40" y="59" textAnchor="middle" fontFamily="Inter Variable, Inter, sans-serif" fontWeight="700" fontSize="8" fill="#fff" letterSpacing="1.5">HALAL</text>
      <text x="40" y="22" textAnchor="middle" fontFamily="Inter Variable, Inter, sans-serif" fontWeight="600" fontSize="5.6" fill="#BFE3CC" letterSpacing="1">CERTIFIED</text>
    </svg>
  );
}

/** Two-up certification card for light sections. */
export function Certifications() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {certifications.map(c => (
        <div key={c.id} className="flex items-center gap-4 rounded-2xl border border-ink/[.08] bg-white p-5">
          <CertBadge id={c.id} size={60} />
          <div>
            <p className="text-[17px] font-medium text-ink">{c.name}</p>
            <p className="mt-0.5 text-[14px] text-secondary">{c.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
