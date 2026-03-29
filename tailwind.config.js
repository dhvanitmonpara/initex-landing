/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: '#080808',
        matrix: '#00FF41',
        lead: '#1A1A1A',
        silver: '#E0E0E0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        data: ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
