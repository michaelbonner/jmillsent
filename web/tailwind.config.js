module.exports = {
	purge: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"trans-black": "rgba(0,0,0,0.5)",
			},
		},
		fontFamily: {
			sans: ["proxima-nova", "sans-serif"],
			outline: ["hwt-republic-gothic-outline", "sans-serif"],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/aspect-ratio"),
	],
}
