/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        112: '28rem',
        128: '32rem'
      },
      maxWidth: {
        112: '28rem',
        128: '32rem',
        144: '36rem',
        160: '40rem'
      }
    }
  },
  plugins: []
}
