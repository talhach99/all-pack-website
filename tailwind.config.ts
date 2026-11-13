import type { Config } from 'tailwindcss';

/**
 * ALL PACK palette: graphite neutrals on a mist page, logo blue as the only accent.
 * Old token names (navy, cyan, brass, cream…) are kept so every page restyles from here,
 * but they now resolve to the graphite ramp instead of extra hues.
 */
const graphite = {
  deep: '#0F1012',
  page: '#141517',
  card: '#1B1C1F',
  raised: '#24252A',
};

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Light ramp
        paper: { DEFAULT: '#FFFFFF', deep: '#F3F4F6', light: '#FFFFFF' },
        mist: '#F3F4F6',
        soft: '#EBECEF',
        line: '#E4E5E9',
        ink: { DEFAULT: '#16171A', soft: '#2A2B30', deep: graphite.deep, 2: graphite.card },
        secondary: '#4A4D55',
        muted: '#6B6E76',
        graphite,
        // The one accent, taken from the logo
        brand: { DEFAULT: '#2B4AFC', dark: '#1D36CC', light: '#8EA0FF' },
        // Process colours, used only for print marks
        cmyk: { c: '#00A3E0', m: '#E6007E', y: '#FFD400', k: '#16171A' },
        // Legacy names folded back into the ramp
        navy: '#16171A',
        cream: '#ECEDEF',
        cyan: { DEFAULT: '#A3A6AE', light: '#C9CBD1', dark: '#6B6E76' },
        brass: { DEFAULT: '#A3A6AE', light: '#C9CBD1', dark: '#6B6E76' },
        sky: { DEFAULT: '#A3A6AE', light: '#C9CBD1' },
        kraft: '#B8946B',
        gold: '#B8946B',
      },
      fontFamily: {
        sans: ['"Figtree Variable"', 'Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque Variable"', '"Figtree Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Bricolage Grotesque Variable"', '"Figtree Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(22,23,26,.05)',
        lift: '0 8px 24px rgba(22,23,26,.06)',
        glow: '0 1px 2px rgba(22,23,26,.05)',
        plate: '0 8px 24px rgba(22,23,26,.06)',
      },
      borderRadius: { '4xl': '1.25rem', '5xl': '1.25rem' },
      transitionTimingFunction: { out: 'cubic-bezier(.22,1,.36,1)' },
    },
  },
  plugins: [],
};
export default config;
