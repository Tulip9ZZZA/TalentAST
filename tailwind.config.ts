import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          black: "#000000",
          void: "#0a0a0a",
          dark: "#141414",
          border: "#262626",
          gray: "#737373",
          light: "#e5e5e5",
          paper: "#fafafa",
          white: "#FFFFFF",
        },
        ast: {
          matched: "#10b981", // or pure binary with high-contrast indicator
          adjacent: "#f59e0b",
          gap: "#ef4444",
        }
      },
      fontFamily: {
        serif: ["'Times New Roman'", "Times", "serif"],
        mono: ["'JetBrains Mono'", "'Courier New'", "Courier", "monospace"],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px 0px #000000',
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-white': '4px 4px 0px 0px #FFFFFF',
        'brutal-lg': '8px 8px 0px 0px #000000',
        'brutal-lg-white': '8px 8px 0px 0px #FFFFFF',
      },
      animation: {
        'glitch-horizontal': 'glitch-h 2.5s infinite linear alternate-reverse',
        'vhs-scan': 'scanlines 8s linear infinite',
        'stickman-run': 'run-cycle 0.5s infinite steps(4)',
        'dither-flicker': 'flicker 0.15s infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'glitch-h': {
          '0%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-2px)' },
          '40%': { transform: 'translateX(3px)' },
          '60%': { transform: 'translateX(-1px)' },
          '80%': { transform: 'translateX(2px)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scanlines': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.94' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
