/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

/** Official ALL PACK logo. `light` swaps the navy parts to white for dark backgrounds. */
export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="ALL PACK, The Packaging Experts — home" className={`inline-flex shrink-0 items-center ${className}`}>
      <img
        src={light ? '/brand/allpack-logo-light.png' : '/brand/allpack-logo.png'}
        alt="ALL PACK — The Packaging Experts"
        width={660}
        height={200}
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}
