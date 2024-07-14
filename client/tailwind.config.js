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
				'linear-gradient(to bottom, #E4C59E 0%, white 30%, white 80%, #991E23 100%)',
			'secondary-gradient':
				'linear-gradient(to bottom, white 0%, white 80%, #991E23 100%)',
			'food-menu-gradient':
				'linear-gradient(to right, #F5AC9F 0%, #991E23 10%, #991E23 90%, #F5AC9F 100%)',
			'card-gradient':
				'linear-gradient(to top, #E9E8F3 0%, white 30%, white 70%, #E9E8F3 100%)',
			'price-gradient':
				'linear-gradient(to top, #E9E8F3 0%, white 70%, transparent 100%)',
			'drink-price-gradient':
				'linear-gradient(to top, #E9E8F3 0%, transparent 70%, transparent 100%)',
			'login-gradient':
				'linear-gradient(to bottom, #991E23 0%, white 80%, white 100%)',
			'parallax-sm': 'url("/images/pizza-eneida-nieves-large-2.jpg")',
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
