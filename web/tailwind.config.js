module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'trans-black': 'rgba(0,0,0,0.5)',
        gold: {
          DEFAULT: '#967738',
        },
      },
      maxWidth: {
        '8xl': '80rem',
        '9xl': '90rem',
        '10xl': '100rem',
        '11xl': '110rem',
        '12xl': '120rem',
        '13xl': '130rem',
      },
    },
    fontFamily: {
      sans: ['proxima-nova', 'sans-serif'],
      outline: ['hwt-republic-gothic-outline', 'sans-serif'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
