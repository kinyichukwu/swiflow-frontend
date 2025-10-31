/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ashy: '#0a0e1a',
        ashyBorder: '#1a2332',
        blue: '#3DB3FC',
      },
    },
  },
  plugins: [],
}
