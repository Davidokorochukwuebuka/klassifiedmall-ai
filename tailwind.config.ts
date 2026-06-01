import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#1E3A5F", light: "#2B4F7E", dark: "#152C4A" },
        secondary: { DEFAULT: "#D4A017", light: "#E6B422", dark: "#B8890F" },
        accent: { DEFAULT: "#61CE70", light: "#7DD88A", dark: "#4BB85A" },
        warning: { DEFAULT: "#D4A017", light: "#E6B422", dark: "#B8890F" },
        error: { DEFAULT: "#DC3545", light: "#E85D6B", dark: "#B52A37" },
        gold: { DEFAULT: "#D4A017", light: "#E6B422", dark: "#B8890F" },
        sky: { DEFAULT: "#6EC1E4", light: "#8DD1EC", dark: "#4FAFD8" },
        surface: { light: "#FAFAFA", dark: "#0D1B2A" },
        card: { light: "#FFFFFF", dark: "#1B2838" },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: { card: "16px", btn: "12px", pill: "9999px" },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(0,0,0,0.08), 0 12px 24px -4px rgba(0,0,0,0.05)",
        glow: "0 0 20px rgba(110,193,228,0.25), 0 0 40px rgba(97,206,112,0.1)",
        "glow-gold": "0 0 20px rgba(212,160,23,0.3), 0 0 40px rgba(212,160,23,0.1)",
        "3d": "0 10px 30px -5px rgba(0,0,0,0.15), 0 4px 6px -2px rgba(0,0,0,0.05)",
        neon: "0 0 5px rgba(110,193,228,0.5), 0 0 20px rgba(110,193,228,0.2), 0 0 40px rgba(110,193,228,0.1)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "ticker": "ticker 30s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(110,193,228,0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(110,193,228,0.6), 0 0 40px rgba(97,206,112,0.2)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
