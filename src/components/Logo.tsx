import Image from 'next/image';
import Link from 'next/link';

/** Both images are sharp vector redraws based on the customer's letterhead.
 * The original photographed artwork is saved in docs for later comparison. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return <Link href="/" aria-label="ALL PACK home" className="inline-flex shrink-0 items-center">
    {compact ? <Image src="/logo.svg" width={108} height={48} alt="ALL PACK" className="h-10 w-auto"/> : <>
      <Image src="/logo.svg" width={900} height={180} alt="ALL PACK — The Packaging Experts" priority className="h-auto w-[144px] sm:w-[192px] md:w-[218px] dark:hidden" />
      <Image src="/logo-dark.svg" width={900} height={180} alt="ALL PACK — The Packaging Experts" priority className="hidden h-auto w-[144px] sm:w-[192px] md:w-[218px] dark:block" />
    </>}
  </Link>;
}
