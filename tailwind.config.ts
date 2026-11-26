import type { Config } from 'tailwindcss';

/**
 * ALL PACK palette, taken from the logo: deep navy, logo blue and sky, with a cyan rule.
 * White and mist grounds only; no black. Older token names stay mapped so nothing breaks.
 */
const graphite = { deep: '#0E1440', page: '#141B4D', card: '#1C2460', raised: '#262F72' };

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#FFFFFF', deep: '#F5F7FA', light: '#FFFFFF' },
        mist: '#F5F7FA',
        card: '#EEF1F5',
        soft: '#E9EDF4',
        line: '#E2E6EE',
        ink: { DEFAULT: '#10142E', soft: '#2B3150', deep: graphite.deep, 2: graphite.card },
        secondary: '#454B66',
        muted: '#626884',
        graphite,
        navy: { DEFAULT: '#141B4D', 2: '#1C2460', deep: '#0E1440' },
        brand: { DEFAULT: '#343B82', dark: '#272D6B', light: '#9FB3E8', tint: '#EEF1FA' },
        sky: { DEFAULT: '#5C8DC3', light: '#B4C6EA' },
        rule: '#1FA8E0',
        cream: '#E3E8F7',
        cyan: { DEFAULT: '#B4BCDB', light: '#D3D9F0', dark: '#626884' },
        kraft: '#B48C62',
      },
      fontFamily: {
        jakarta: ['var(--font-jakarta)', '"Plus Jakarta Sans Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-jakarta)', '"Plus Jakarta Sans Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', '"Plus Jakarta Sans Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,27,77,.05)',
        lift: '0 24px 48px -28px rgba(20,27,77,.35)',
      },
      transitionTimingFunction: { out: 'cubic-bezier(.22,1,.36,1)' },
    },
  },
  plugins: [],
};
export default config;
