import type { Config } from 'tailwindcss';

/**
 * Premium palette: deep ink navy, warm ivory paper and brass accents.
 * Token names are kept from the previous theme so every page restyles from here.
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#FFFFFF', deep: '#F6F8FE', light: '#FAFBFF' },
        ink: { DEFAULT: '#06104A', soft: '#26305E', deep: '#040B36', 2: '#0A1A6B' },
        muted: '#4A5378',
        line: '#E1E6F5',
        soft: '#EEF2FF',
        mist: '#EEF2FF',
        brand: { DEFAULT: '#2B4BFF', dark: '#0A208F', light: '#5C76FF' },
        navy: '#0A208F',
        cyan: { DEFAULT: '#22C3F0', light: '#8FE1F8', dark: '#0E9CC6' },
        brass: { DEFAULT: '#22C3F0', light: '#8FE1F8', dark: '#0E9CC6' },
        sky: { DEFAULT: '#22C3F0', light: '#8FE1F8' },
        kraft: '#C9A27A',
        gold: '#C9A35B',
        cream: '#F3F6FF',
      },
      fontFamily: {
        sans: ['"Figtree Variable"', 'Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Figtree Variable"', 'Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces Variable"', 'Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(6,16,74,.04), 0 18px 44px -22px rgba(6,16,74,.22)',
        lift: '0 2px 4px rgba(6,16,74,.04), 0 40px 70px -36px rgba(6,16,74,.45)',
        glow: '0 20px 50px -14px rgba(43,75,255,.45)',
        plate: '0 60px 100px -50px rgba(6,16,74,.45), inset 0 0 0 1px rgba(255,255,255,.6)',
      },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
        spin3d: { from: { transform: 'rotateX(-24deg) rotateY(0deg)' }, to: { transform: 'rotateX(-24deg) rotateY(360deg)' } },
      },
      animation: {
        marquee: 'marquee 50s linear infinite',
        float: 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        spin3d: 'spin3d 16s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
