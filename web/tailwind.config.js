module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
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
            },
        },
        fontFamily: {
            sans: ['proxima-nova', 'sans-serif'],
            outline: ['hwt-republic-gothic-outline', 'sans-serif'],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
