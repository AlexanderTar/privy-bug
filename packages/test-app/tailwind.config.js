/* eslint-disable @typescript-eslint/no-require-imports */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './components/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './app/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        black: {
          DEFAULT: '#000000',
        },
        gray: {
          150: '#E5E5E5',
          200: '#EEEEEE',
          300: '#D9D9D9',
          350: '#F9F9F9',
          375: '#ACACAC',
          400: '#AAAAAA',
          450: '#727272',
          500: '#7F7B7B',
          600: '#6A6A6A',
          650: '#5D5D5D',
          700: '#474545',
          800: '#464646',
          900: '#333333',
        },
        blue: '#3060DD',
        danger: '#DF3030',
        background: {
          DEFAULT: '#FFFFFF',
          black: '#000000',
          blue: '#F6FCFF',
          secondary: '#F4F4F4',
        },
        border: {
          DEFAULT: '#E2E2E2',
          black: '#333333',
          blue: '#1E1CFD',
          secondary: '#DCDCDC',
          error: '#DF3030',
        },
        button: {
          DEFAULT: '#FFFFFF',
          secondary: '#F9F9F9',
          black: '#201E1E',
          red: '#F91515',
          blue: '#0070F3',
        },
        primary: {
          200: '#5BF5F0',
          300: '#1789A2',
        },
        secondary: {
          200: '#0F0F11',
          100: '#757575',
        },
        error: '#FF0000',
        surface: '#FFFFFF',
        outline: '#E4E4E4',
        disabled: '#BCBCBC',
        pending: '#B56026',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('tailwind-scrollbar'),
  ],
}

