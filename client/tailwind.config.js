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
          bg: '#F2EEE8',
          text: '#232019',
          border: '#3A342A',
          accent: '#B8613F',
          secondary: '#7C8A6B',
          surface: '#F8F5EF'
        },
        dark: {
          bg: '#1C1814',
          text: '#EFE8DC',
          border: '#463C31',
          accent: '#D08662',
          secondary: '#93A17F',
          surface: '#241F19'
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
