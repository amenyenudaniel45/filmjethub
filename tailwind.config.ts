// tailwind.config.ts
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        red: "#E50914",
        dark: "#000000",
        white: "#FFFFFF",
        gray: "#414141",
      },

      screens: {
        xs: "450px",
        sm: "650px",
        md: "900px",
        lg: "1100px",
      },
    },
  },
  plugins: [
    // Include any plugins you may need
  ],
} as const;
