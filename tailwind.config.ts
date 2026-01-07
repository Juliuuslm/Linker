import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#F8F8F8",
          text: "#191A1B",
          muted: "#838A8D",
          contrast: "#F84733",
        },
        dark: {
          bg: "#191A1B",
          text: "#F6F6F6",
          muted: "#F3DDCA",
          contrast: "#F84733",
        },
        primary: "#F84733",
        secondary: "#191A1B",
      },
      fontFamily: {
        kangge: ["var(--font-kangge)", "serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        quicksand: ["var(--font-quicksand)", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        slideUp: "slideUp 0.4s ease-out",
        scaleIn: "scaleIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
