/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#991E23',
				secondary: '#E4C59E',
				third: '#AF8260',
				forth: '#322C2B',
			},
		},
		fontFamily: {
			'noto-serif-display': ['Noto Serif Display', 'serif'],
			'handlee-regular': ['Noto Serif Display', 'serif'],
		},
	},
	plugins: [],
};
