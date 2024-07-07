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
		backgroundImage: {
			'main-gradient':
				'linear-gradient(to bottom, #E4C59E 0%, white 30%, white 70%, #991E23 100%)',
			'food-menu-gradient':
				'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
			'card-gradient':
				'linear-gradient(to top, white 0%, transparent 100%)',
		},
		fontFamily: {
			'noto-serif-display': ['Noto Serif Display', 'serif'],
			'handlee-regular': ['Noto Serif Display', 'serif'],
			montserrat: ['Montserrat', 'sans-serif'],
			caveat: ['Caveat', 'cursive'],
			cinzel: ['Cinzel', 'serif'],
			dmsans: ['DM Sans', 'sans-serif'],
		},
	},
	plugins: [],
};
