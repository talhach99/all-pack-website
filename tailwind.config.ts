import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBFBF9',
        ink: { DEFAULT: '#0A1433', soft: '#1C2750' },
        muted: '#5B6785',
        line: '#E5E8EF',
        soft: '#F3F4F7',
        mist: '#EAF1FB',
        brand: { DEFAULT: '#2B3A8C', dark: '#1F2B6C', light: '#4D5FB8' },
        sky: { DEFAULT: '#3A7FC0', light: '#9CC3EA' },
        kraft: '#C9A27A',
        gold: '#C9A35B',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Inter Tight Variable"', '"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,20,51,.04), 0 12px 40px -12px rgba(10,20,51,.12)',
        lift: '0 2px 4px rgba(10,20,51,.04), 0 30px 60px -20px rgba(10,20,51,.25)',
        glow: '0 20px 50px -12px rgba(43,58,140,.45)',
      },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
