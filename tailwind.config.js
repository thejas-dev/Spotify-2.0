/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes:{
        wave:{
          '0%': { height: '5px' },
          '100%': { height: '1000px' }
        },
      },
      animation: {
        'reveal-bar': 'wave 1s infinte linear '
      },
      screens:{
        'sm': {'max': '450px'},
      }

    },

  },
  plugins: [
  	 require('tailwind-scrollbar-hide'),	
     require('tailwindcss-textshadow')
  ],
}
