import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05060A",
        surface: {
          DEFAULT: "#0D0F16",
          hover: "#12141F",
          raised: "#161923",
        },
        border: {
          DEFAULT: "#1D2030",
          subtle: "#151723",
        },
        foreground: {
          DEFAULT: "#E7E9F3",
          muted: "#8B8FA8",
          faint: "#5B5F76",
        },
        primary: {
          DEFAULT: "#7C5CFF",
          hover: "#6A48F2",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#22D3EE",
          hover: "#0FB8D4",
        },
        success: "#22C55E",
        warning: "#F5A524",
        danger: "#F5455C",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124,92,255,0.25), 0 8px 30px rgba(124,92,255,0.15)",
        "glow-accent":
          "0 0 0 1px rgba(34,211,238,0.25), 0 8px 30px rgba(34,211,238,0.12)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(124,92,255,0.14), transparent 60%)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
