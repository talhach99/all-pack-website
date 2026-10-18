import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        soft: "rgb(var(--soft) / <alpha-value>)",
        brand: "#303C85",
        skybrand: "#387EB7"
      },
      boxShadow: { card: "0 22px 60px rgba(36, 52, 107, .09)", soft: "0 6px 30px rgba(27,43,103,.06)" },
      borderRadius: { '4xl': '2rem' },
      fontFamily: { sans: ['var(--font-inter)', 'Arial', 'sans-serif'], display: ['var(--font-manrope)', 'Arial', 'sans-serif'] }
    },
  },
  plugins: [],
};
export default config;
