/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

/**
 * Official ALL PACK logo. `light` swaps the navy parts to white for dark backgrounds.
 * Served as a 440px WebP (about 22 KB) instead of the 90 KB PNG; the PNG stays for schema.org / social use.
 */
export function Logo({ light = false, className = '', imgClassName = 'h-10 w-auto sm:h-11', priority = false, tabIndex, src }: { light?: boolean; className?: string; imgClassName?: string; priority?: boolean; tabIndex?: number; src?: string }) {
  return (
    <Link href="/" tabIndex={tabIndex} aria-label="ALL PACK, The Packaging Experts — home" className={`inline-flex shrink-0 items-center ${className}`}>
      <img
        src={src || (light ? '/brand/allpack-logo-light.webp' : '/brand/allpack-logo.webp')}
        alt="ALL PACK — The Packaging Experts"
        width={440}
        height={133}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
        className={imgClassName}
      />
    </Link>
  );
}
