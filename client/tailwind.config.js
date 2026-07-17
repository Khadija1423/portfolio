/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#FAF9F6', // Off-white/paper
          text: '#1A1A1A', // Charcoal
          border: '#1A1A1A', // Charcoal thick border
          accent: '#002FA7', // Cobalt Blue
        },
        dark: {
          bg: '#121212', // Dark slate grey
          text: '#E5E5E5', // Paper-gray
          border: '#333333', // Stark borders
          accent: '#39FF14', // Neon Green
        },
      }
    },
  },
  plugins: [],
}
