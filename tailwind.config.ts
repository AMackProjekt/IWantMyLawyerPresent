import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Arial"]
      },
      maxWidth: {
        container: "1200px"
      },
      borderRadius: {
        xl: "26px",
        lg: "18px",
        md: "12px"
      },
      letterSpacing: {
        tight2: "-0.035em"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(212,175,55,.18), 0 10px 30px rgba(0,0,0,.45)",
        neon: "0 0 5px rgba(212,175,55,0.5), 0 0 10px rgba(212,175,55,0.3), 0 0 15px rgba(212,175,55,0.2)",
        "neon-brand2": "0 0 5px rgba(192,192,192,0.5), 0 0 10px rgba(192,192,192,0.3), 0 0 15px rgba(192,192,192,0.2)",
        "neon-accent": "0 0 5px rgba(139,69,19,0.5), 0 0 10px rgba(139,69,19,0.3), 0 0 15px rgba(139,69,19,0.2)",
        "neon-green": "0 0 5px rgba(212,175,55,0.5), 0 0 10px rgba(212,175,55,0.3), 0 0 15px rgba(212,175,55,0.2)",
        "electric": "0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.2)",
        "electric-intense": "0 0 40px rgba(212,175,55,0.4), 0 0 80px rgba(212,175,55,0.3), 0 0 120px rgba(212,175,55,0.2)"
      },
      colors: {
        bg: "#000000",
        panel: "#0a0a0a",
        glass: "rgba(255,255,255,.04)",
        border: "rgba(212,175,55,.15)",
        text: "rgba(255,255,255,.95)",
        muted: "rgba(169,169,169,.90)",
        brand: "#d4af37",
        brand2: "#c0c0c0",
        accent: "#8b4513",
        // Light mode variants
        "light-bg": "#ffffff",
        "light-panel": "#f5f5f5",
        "light-glass": "rgba(0,0,0,.04)",
        "light-border": "rgba(0,0,0,.1)",
        "light-text": "rgba(0,0,0,.95)",
        "light-muted": "rgba(100,100,100,.92)",
        electric: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#d4af37",
          500: "#c0a030",
          600: "#a88c2a",
          700: "#8b7323",
          800: "#6b5a1c",
          900: "#4d4116"
        }
      },
      backgroundImage: {
        "dash-glow":
          "radial-gradient(900px 400px at 20% -10%, rgba(212,175,55,.12), transparent), radial-gradient(600px 300px at 90% 10%, rgba(192,192,192,.10), transparent), radial-gradient(700px 400px at 50% 100%, rgba(139,69,19,.08), transparent)",
        "electric-glow":
          "radial-gradient(900px 400px at 20% -10%, rgba(212,175,55,.14), transparent), radial-gradient(600px 300px at 90% 10%, rgba(192,192,192,.12), transparent), radial-gradient(700px 400px at 50% 100%, rgba(139,69,19,.10), transparent)"
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "electric-pulse": "electric-pulse 2s ease-in-out infinite",
        "spark": "spark 1.5s ease-in-out infinite"
      },
      keyframes: {
        "electric-pulse": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.2)"
          },
          "50%": {
            opacity: "0.8",
            boxShadow: "0 0 40px rgba(212,175,55,0.5), 0 0 80px rgba(212,175,55,0.3)"
          }
        },
        "spark": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.9" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
