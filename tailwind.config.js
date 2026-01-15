/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Scan all React files
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.3s ease-in-out',
        'slide-fade-in': 'slideFadeIn 0.5s ease-out forwards',
        'hover-bounce': 'hoverBounce 0.4s ease-in-out infinite',
      },
      keyframes: {
        slideFadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-0.5rem)' },
          '75%': { transform: 'translateX(0.5rem)' },
        },
        hoverBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5%)' }, // small upward bounce
        },
      },
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
