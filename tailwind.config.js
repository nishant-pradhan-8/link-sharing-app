/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily:{
        'primary-font':"Instrument Sans, sans-serif",
      },
      lineHeight:{
        'lh':'150%'
      }
    },
  },
  plugins: [],
}

