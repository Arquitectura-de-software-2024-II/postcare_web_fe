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
        backgroundColor: {
          90: "var(--background-color-90)",
          DEFAULT: "var(--background-color-100)",
          110: "var(--background-color-110)",
        },
        textColor: {
          40: "var(--text-color-40)",
          50: "var(--text-color-50)",
          90: "var(--text-color-90)",
          DEFAULT: "var(--text-color)",
          110: "var(--text-color-110)",
        },
        cardColor: "var(--card-color)",
        primaryColor: {
          1: "var(--primary-color-1)",
          5: "var(--primary-color-5)",
          10: "var(--primary-color-10)",
          20: "var(--primary-color-20)",
          DEFAULT: "var(--primary-color-100)",
          110: "var(--primary-color-110)",
        },
        secondaryColor: {
          DEFAULT: "var(--secondary-color)",
          50: "rgba(175, 223, 255, 0.50)",
        },
        errorColor: {
          5: "var(--error-color-5)",
          10: "var(--error-color-10)",
          20: "var(--error-color-20)",
          DEFAULT: "var(--error-color-100)",
          110: "var(--error-color-110)",
        },
        successColor: {
          5: "var(--success-color-5)",
          10: "var(--success-color-10)",
          20: "var(--success-color-20)",
          DEFAULT: "var(--success-color-100)",
          110: "var(--success-color-110)",
        },
        grayColor:{
          20: "var(--gray-color-20)",
          30: "var(--gray-color-30)",
          40: "var(--gray-color-40)",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
