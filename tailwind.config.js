/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./docs/index.html"],
  theme: {
    extend: {
      colors: {
        jade: {
          50: "#effcfa",
          100: "#d6f6f2",
          200: "#aeece4",
          300: "#81d8d0",
          400: "#4fc2ba",
          500: "#2aa7a1",
          600: "#1f8682",
          700: "#1b6b69",
          800: "#165554",
          900: "#0f3c3c",
        },
        ink: {
          50: "#f7f8fb",
          100: "#eef0f6",
          200: "#d8dce9",
          300: "#b6bdd5",
          400: "#8b95b7",
          500: "#68749e",
          600: "#515b82",
          700: "#414966",
          800: "#2b3147",
          900: "#171a2a",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
      },
      boxShadow: {
        card: "0 10px 25px -15px rgba(17, 24, 39, 0.35)",
      },
    },
  },
  plugins: [],
};
