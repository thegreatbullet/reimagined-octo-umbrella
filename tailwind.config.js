/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Scan all React files
  ],
  theme: {
    extend: {
      colors: {
        red: {
          light: '#E84855',
          dark: '#830A48',
        },
        orange: {
          light: '#E39774',
          dark: '#FA7921',
        },
        yellow: {
          light: '#F7F06D',
          dark: '#F9DB6D',
        },
        green: {
          light: '#5C9EAD',
          dark: '#326273',
        },
        blue: {
          light: '#449DD1',
          dark: '#0E0E52',
        },
        indigo: {
          light: '#464D77',
          dark: '#40376E',
        },
        violet: {
          light: '#3943B7',
          dark: '#832161',
        },
        white: {
          light: '#FFFFFF',
          dark: '#EEEEEE',
        },
        black: {
          primary: '#1D1E2C',
        },
        brown: {
          light: '#877666',
          dark: '#424242',
        },
      },
    },
  },
  plugins: [],
}
