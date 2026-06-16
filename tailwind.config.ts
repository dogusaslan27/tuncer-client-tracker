import type { Config } from "tailwindcss";

/**
 * Tailwind config extended with the Tuncer Turizm brand palette.
 * Use these tokens (e.g. `bg-tuncer-blue`, `text-tuncer-gray`) instead of
 * raw hex values anywhere in the app.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tuncer-blue": "#0067B4",
        "tuncer-navy": "#004A82",
        "tuncer-blue-tint": "#E6F1FB",
        "tuncer-gold": "#B8912A",
        "tuncer-white": "#FFFFFF",
        "tuncer-offwhite": "#F7F8FA",
        "tuncer-gray": "#6B7280",
        "tuncer-border": "#E2E8F0",
        "tuncer-text": "#1A202C",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
      borderRadius: {
        card: "10px",
        input: "6px",
        btn: "4px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
