/* eslint-disable @next/next/no-img-element */
import { photoUrl } from '@/lib/photos';

/** Responsive studio photograph from /public/photos (name.webp = 1600px, name-800.webp = 800px). */
export function Photo({ name, alt, className = '', sizes = '(min-width: 1024px) 50vw, 100vw', priority = false, width = 1600, height = 1280 }: { name: string; alt: string; className?: string; sizes?: string; priority?: boolean; width?: number; height?: number }) {
  return (
    <img
      src={photoUrl(name)} srcSet={`${photoUrl(name, true)} 800w, ${photoUrl(name)} ${width}w`} sizes={sizes}
      alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
