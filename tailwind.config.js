/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bodyBgStart: "#6D6962",
        bodyBgMid: "#A6A5A1",
        bodyBgEnd: "#C6C2B3",
      },
      fontFamily: {
        memoirs: ['"Mouse Memoirs"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
