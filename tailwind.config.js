/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef1ff', 100: '#e0e5ff', 200: '#c7cfff', 300: '#a5b0ff',
          400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
          800: '#3730a3', 900: '#312e81',
        },
        accent: {
          400: '#c084fc', 500: '#a855f7', 600: '#9333ea',
        },
      },
    },
  },
  plugins: [],
}
