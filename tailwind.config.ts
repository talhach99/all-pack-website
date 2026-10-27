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
        paper: { DEFAULT: '#FFFFFF', deep: '#F1F3F6', light: '#F8F9FA' },
        ink: { DEFAULT: '#0D1220', soft: '#1D2640', deep: '#080C16', 2: '#141B2E' },
        muted: '#5D6172',
        line: '#E4E7EC',
        soft: '#EDE7DC',
        mist: '#ECE5D8',
        brand: { DEFAULT: '#22337A', dark: '#16224F', light: '#3D52A8' },
        brass: { DEFAULT: '#B48A4F', light: '#D4B07A', dark: '#8E6A37' },
        sky: { DEFAULT: '#B48A4F', light: '#D4B07A' },
        kraft: '#C9A27A',
        gold: '#C9A35B',
        cream: '#EFE9DD',
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Manrope Variable"', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces Variable"', 'Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(13,18,32,.04), 0 18px 44px -22px rgba(13,18,32,.22)',
        lift: '0 2px 4px rgba(13,18,32,.04), 0 40px 70px -36px rgba(13,18,32,.45)',
        glow: '0 20px 50px -14px rgba(180,138,79,.55)',
        plate: '0 60px 100px -50px rgba(13,18,32,.45), inset 0 0 0 1px rgba(255,255,255,.6)',
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
