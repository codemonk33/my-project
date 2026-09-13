import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: {
          DEFAULT: "#FBF9F5",
          50: "#FFFFFF",
          100: "#FDFCFB",
          200: "#FBF9F5",
          300: "#F5F2EB",
          400: "#EDE7DC",
        },
        linen: {
          DEFAULT: "#EFECE6",
          50: "#FAF9F7",
          100: "#F5F3EF",
          200: "#EFECE6",
          300: "#E3DDD3",
          400: "#D4CAC0",
        },
        obsidian: {
          DEFAULT: "#121212",
          50: "#2B2B2B",
          100: "#222222",
          200: "#1A1A1A",
          300: "#151515",
          400: "#121212",
          900: "#0A0A0A",
        },
        terracotta: {
          DEFAULT: "#C87D55",
          light: "#DB9975",
          dark: "#A35C35",
          deep: "#844422",
        },
        indigoVat: {
          DEFAULT: "#1F2B37",
          light: "#2C3D4E",
          dark: "#141C24",
        },
        rawWool: {
          DEFAULT: "#DDD7CD",
          light: "#EBE7DF",
          dark: "#C5BCAD",
        },
        burntOchre: {
          DEFAULT: "#A86438",
          light: "#C07B4D",
          dark: "#874D26",
        },
        craftBorder: "#E3DDD2",
      },
      fontFamily: {
        serif: [
          '"Playfair Display"',
          'Canela',
          '"GT Super Display"',
          'Baskerville',
          'Georgia',
          'serif',
        ],
        sans: [
          '"Plus Jakarta Sans"',
          '"Neue Haas Grotesk"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        mono: [
          '"DM Mono"',
          '"Söhne Mono"',
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '88': '22rem',
        '104': '26rem',
        '120': '30rem',
      },
      letterSpacing: {
        'widest-editorial': '0.22em',
        'tight-editorial': '-0.035em',
      },
      boxShadow: {
        'luxury-soft': '0 20px 50px -15px rgba(18, 18, 18, 0.07)',
        'luxury-elevated': '0 30px 70px -20px rgba(18, 18, 18, 0.12)',
        'relief-inset': 'inset 0 2px 4px rgba(0,0,0,0.06)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      animation: {
        'slow-drift': 'drift 18s ease-in-out infinite alternate',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(10px, -8px) scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
