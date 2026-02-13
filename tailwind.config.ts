import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./messages/*.json",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        foreground: "var(--foreground)",
        obsidian: "#0F172A",
        steel: "#64748B",
        azure: "#2563EB",
        violet: "#7C3AED",
        magenta: "#DB2777",
        safetyOrange: "#F97316",
        codeGreen: "#10B981",
      },
      backgroundImage: {
        'cool-gradient': 'linear-gradient(to right, #2563EB, #7C3AED, #DB2777)',
      },
      boxShadow: {
        'glass-base': '0 8px 30px rgb(0 0 0 / 0.12)',
      },
      borderRadius: {
        'glass': '24px',
        'pill': '9999px',
        'input': '16px',
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        drift: "drift 60s linear infinite",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
