/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: '#FF78AC',
        teal: '#A8D5E3',
        cream: '#F2F0EA',
        dark: '#333333',
        light: '#FFFFFF',
        gray: '#888888',
        primary: {
          50: '#ffeff5',
          100: '#ffe0eb',
          200: '#ffc1d7',
          300: '#ff93b7',
          400: '#ff78ac',
          500: '#ff5091',
          600: '#ff2d77',
          700: '#ff0a5e',
          800: '#d6004e',
          900: '#ae0040',
        },
        secondary: {
          50: '#f0f8fa',
          100: '#e0f0f5',
          200: '#c7e4ed',
          300: '#a8d5e3',
          400: '#7bc0d6',
          500: '#5aa9c4',
          600: '#4990b0',
          700: '#3c7690',
          800: '#356176',
          900: '#305364',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      backgroundColor: {
        'cream': '#F2F0EA',
      },
      textColor: {
        'dark': '#333333',
        'light': '#FFFFFF',
        'gray': '#888888',
      },
    },
  },
  plugins: [],
} 