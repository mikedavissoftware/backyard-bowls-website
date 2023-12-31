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
        dark1: '1px 1px 1px rgb(0 0 0 / 0.80)',
        dark2: '2px 2px 2px rgb(0 0 0 / 0.80)',
        dark3: '3px 3px 3px rgb(0 0 0 / 0.80)',
        dark4: '4px 4px 4px rgb(0 0 0 / 0.80)',
        dark5: '5px 5px 5px rgb(0 0 0 / 0.80)'
      },
    },
  },
  daisyui: {
    themes: [
      {
        backyardBowls: {
          "primary": "#80b217",
          "secondary": "#13242f",
          "accent": "#ffa500",
          "neutral": "#333",
          "base-100": "#222",
          "info": "#fadc00",
          "success": "#1f9045",
          "warning": "#df1a22",
          "error": "#df1a22",
        },
      }
    ]
  },
  plugins: [require("daisyui")],
}