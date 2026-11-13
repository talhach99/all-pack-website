import type { Config } from 'tailwindcss';

/**
 * ALL PACK palette: navy and white, with the logo blue as the accent. No black.
 * Old token names (ink, graphite, cyan, cream…) are kept so every page restyles from here.
 */
const graphite = {
  deep: '#06122E',
  page: '#0A1A3F',
  card: '#10224A',
  raised: '#1E3466',
};

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#FFFFFF', deep: '#F3F5F8', light: '#FFFFFF' },
        mist: '#F3F5F8',
        soft: '#E9EDF5',
        line: '#E2E5EA',
        ink: { DEFAULT: '#0B1F4D', soft: '#16306A', deep: graphite.deep, 2: graphite.card },
        secondary: '#454B55',
        muted: '#6B717B',
        graphite,
        navy: { DEFAULT: '#0B1F4D', 2: '#0F2A63', deep: '#0A1A3F' },
        brand: { DEFAULT: '#2B4AFC', dark: '#1D36CC', light: '#A9B8FF', tint: '#EEF2FF' },
        cream: '#E3E8F7',
        cyan: { DEFAULT: '#AAB3C5', light: '#C9D2FF', dark: '#6B717B' },
        brass: { DEFAULT: '#AAB3C5', light: '#C9D2FF', dark: '#6B717B' },
        sky: { DEFAULT: '#A9B8FF', light: '#C9D2FF' },
        kraft: '#B8946B',
        gold: '#B8946B',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,31,77,.05)',
        lift: '0 24px 48px -28px rgba(11,31,77,.4)',
        glow: '0 1px 2px rgba(11,31,77,.05)',
        plate: '0 30px 60px -28px rgba(11,31,77,.45)',
      },
      borderRadius: { '4xl': '1.5rem', '5xl': '1.75rem' },
      transitionTimingFunction: { out: 'cubic-bezier(.22,1,.36,1)' },
    },
  },
  plugins: [],
};
export default config;
