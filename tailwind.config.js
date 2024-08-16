/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakartasans: ['Plus Jakarta Sans', 'sans-serif'],
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
          3: '#D9D9D9',
          9: '#1C1C1E',
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
      backgroundImage: {
        'fill0': 'linear-gradient(to bottom, #FFFFFF 8%, #FFFFFF 26%, #E4EDFF 100%)',
        'fill1': 'linear-gradient(to bottom, #1C1C1F 8%, #1C1C1F 26%, #0A3967 100%)',
        'fill4': 'linear-gradient(to bottom, #0A3967 0%, #0066AE 96%)',
      },
      boxShadow: {
        'box': '0px 0px 9px rgba(0, 0, 0, 0.01), 0px 0px 8px rgba(0, 0, 0, 0.05), 0px 0px 6px rgba(0, 0, 0, 0.09), 0px 0px 3px rgba(0, 0, 0, 0.1)',
        'v6': '0px 2px 8px rgba(40, 41, 61, 0.04), 0px 16px 24px rgba(96, 97, 112, 0.16)',
      },
    },
  },
  plugins: [],
}