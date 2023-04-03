/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
   
    extend: {
      fontFamily: {
        'poppins': ['Poppins']
      },
      colors:{
        primary:{
          100:'#1d2026',
          50:"#292d36fa",
          80:"#0c1018"
         
        },
        secondary:{
          100:'#cb920c',
          50:'#f5cc77'
        }
      }
    },
  },
  plugins:  [require("tw-elements/dist/plugin")],
}
