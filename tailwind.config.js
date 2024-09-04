/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {},
    backgroundImage: {
      main: 'url(./assets/img/pexels-pixabay-209831.jpg)',
      clear: 'url(./assets/img/clear.jpg)',
      rain: 'url(./assets/img/rain.jpg)',
      snow: 'url(./assets/img/snow.jpg)',
      cloudy: 'url(./assets/img/cloudy.jpg)',
      thunderstorm: 'url(./assets/img/thunderstorm.jpg)',
    },
  },
  plugins: [],
}
