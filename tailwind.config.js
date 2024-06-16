/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(137.05deg, rgba(70, 163, 88, 0.45) -24.6%, #46A358 100%)',
      },
    },
  },
  plugins: [],
}