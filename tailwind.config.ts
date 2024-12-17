import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "var(--main-color)",
        primary: "var(--primary-color)",
        black: "var(--black-color)",
        secondary: {
          DEFAULT: "var(--secondary-color)",
          50: 'rgba(175, 223, 255, 0.50)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
