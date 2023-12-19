/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bybg: '#13242f',
        bybb: '#80b217',
      },
      backgroundImage: {
        banner: "url('/src/assets/images/backdrop.png')"
      },
      dropShadow: {
        dark: '5px 5px 5px rgb(0 0 0 / 0.80)'
      },
    },
  },
  plugins: [require("daisyui")],
}