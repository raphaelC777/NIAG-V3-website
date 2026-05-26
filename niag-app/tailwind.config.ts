import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0A1F44", 600: "#1E3360" },
        green: { DEFAULT: "#1FB573", hover: "#168B57" },
        cream: "#FAF7F2",
        sand: "#F1ECE0",
        ink: { DEFAULT: "#2C2C2A", soft: "#5F5E5A" },
        line: "#D3D1C7",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,31,68,0.06)",
        card: "0 4px 14px rgba(10,31,68,0.08)",
        pop: "0 12px 36px rgba(10,31,68,0.12)",
      },
      borderRadius: { xs: "6px", lg: "16px" },
      maxWidth: { container: "1180px" },
    },
  },
  plugins: [],
};
export default config;
