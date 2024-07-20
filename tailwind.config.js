/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        'xl': ['32px', { lineHeight: '40px', letterSpacing: '-0.75px' }],
        'lg': ['24px', { lineHeight: '32px', letterSpacing: '0px' }],
        'md': ['20px', { lineHeight: '24px', letterSpacing: '0.65px' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '0.15px' }],
        'sm': ['14px', { lineHeight: '24px', letterSpacing: '0px' }],
        'xs': ['12px', { lineHeight: '24px', letterSpacing: '0px' }],
      },
      colors: {
        neutral: {
          1: '#ffffff',
          2: '#f5f5f5',
          3: '#b3b3b3',
          9: '#1c1c1e',
        },
        primary: {
          blue: '#0066ae',
          'dark-blue': '#0a3967',
          'light-blue': '#e4edff',
        },
        secondary: {
          red: '#cb3a31',
          green: '#12d79c',
          yellow: '#ffb831',
        },
      },
    },
  },
  plugins: [],
}