/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sui.io inspired colors
        'sui-blue': '#4da2ff',
        'sui-blue-dark': '#4d65ff',
        'sui-bg': '#011829',
        'sui-light': '#F7F7F8',
        // Keep existing colors for backward compatibility
        ashy: '#011829', // Updated to match sui.io dark bg
        blue: '#4da2ff', // Updated to match sui.io blue
        // Gradient colors
        'gradient-blue-start': '#3DB3FC',
        'gradient-blue-mid': '#5C80FA',
        'gradient-purple-end': '#936BF9',
      },
    },
  },
  plugins: [],
}
