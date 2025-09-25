/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
        colors: {
        'gov-blue': '#004080',
        'gov-navy': '#003366',
        'gov-gold': '#FFCC00',
        'env-green': '#2E7D32'
      }
    },
  },
  plugins: [],
}
