import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ame: {
          black:  "#050508",
          void:   "#0a0a12",
          deep:   "#0d0d1a",
          purple: "#7c3aed",
          violet: "#4c1d95",
          indigo: "#3730a3",
          rain:   "#a78bfa",
          fog:    "#c4b5fd",
          steel:  "#1e293b",
          iron:   "#334155",
          text:   "#e2e8f0",
          muted:  "#64748b",
          dim:    "#475569",
          cyber:  "#06b6d4",
          teal:   "#0891b2",
          blood:  "#ef4444",
          rust:   "#dc2626",
        }
      },
      fontFamily: {
        orbitron:   ["Orbitron", "monospace"],
        mono:       ["JetBrains Mono", "monospace"],
        jp:         ["Noto Sans JP", "sans-serif"],
      },
      backgroundImage: {
        "ame-gradient": "linear-gradient(135deg, #050508 0%, #0d0d1a 50%, #1a0533 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(10,10,18,0.95) 100%)",
        "glow-purple": "radial-gradient(circle at center, rgba(124,58,237,0.3) 0%, transparent 70%)",
      },
      animation: {
        "rain":       "rain 1s linear infinite",
        "flicker":    "flicker 3s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "scan":       "scan 4s linear infinite",
        "float":      "float 6s ease-in-out infinite",
        "glow":       "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        rain: {
          "0%":   { transform: "translateY(-100%)", opacity: "0" },
          "10%":  { opacity: "1" },
          "90%":  { opacity: "0.8" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        flicker: {
          "0%, 95%, 100%": { opacity: "1" },
          "96%":            { opacity: "0.6" },
          "97%":            { opacity: "1" },
          "98%":            { opacity: "0.4" },
          "99%":            { opacity: "0.9" },
        },
        scan: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        glow: {
          "from": { boxShadow: "0 0 10px rgba(124,58,237,0.4), 0 0 20px rgba(124,58,237,0.2)" },
          "to":   { boxShadow: "0 0 20px rgba(124,58,237,0.8), 0 0 40px rgba(124,58,237,0.4)" },
        },
      },
      boxShadow: {
        "ame":      "0 0 20px rgba(124,58,237,0.3), 0 0 40px rgba(124,58,237,0.1)",
        "ame-lg":   "0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)",
        "cyber":    "0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.1)",
        "inset-ame":"inset 0 0 30px rgba(124,58,237,0.1)",
      },
      borderColor: {
        "ame-DEFAULT": "rgba(124,58,237,0.3)",
      },
      typography: {
        invert: {
          css: {
            "--tw-prose-body":          "#e2e8f0",
            "--tw-prose-headings":      "#a78bfa",
            "--tw-prose-links":         "#7c3aed",
            "--tw-prose-bold":          "#e2e8f0",
            "--tw-prose-counters":      "#a78bfa",
            "--tw-prose-bullets":       "#7c3aed",
            "--tw-prose-hr":            "#1e293b",
            "--tw-prose-quotes":        "#a78bfa",
            "--tw-prose-quote-borders": "#7c3aed",
            "--tw-prose-captions":      "#64748b",
            "--tw-prose-code":          "#06b6d4",
            "--tw-prose-pre-code":      "#e2e8f0",
            "--tw-prose-pre-bg":        "#0a0a12",
            "--tw-prose-th-borders":    "#1e293b",
            "--tw-prose-td-borders":    "#1e293b",
          }
        }
      }
    },
  },
  plugins: [],
};

export default config;
