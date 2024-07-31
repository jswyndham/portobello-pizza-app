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
			'main-gradient-two':
				'linear-gradient(to bottom, white 0%, white 70%, #991E23 100%)',
			'heading-two-gradient':
				'linear-gradient(to right, transparent 0%, white 3%, white 97%, transparent 100%)',
			'secondary-gradient':
				'linear-gradient(to bottom, white 0%, white 80%, #991E23 100%)',
			'food-menu-gradient':
				'linear-gradient(to right, #F5AC9F 0%, #991E23 10%, #991E23 90%, #F5AC9F 100%)',
			'contact-gradient':
				'linear-gradient(to right, black 0%, black 55%, #991E23 100%)',
			'card-gradient':
				'linear-gradient(to top, #E9E8F3 0%, white 25%, white 75%, #E9E8F3 100%)',
			'price-gradient':
				'linear-gradient(to top, #E9E8F3 0%, white 70%, transparent 100%)',
			'drink-price-gradient':
				'linear-gradient(to top, #E9E8F3 0%, transparent 70%, transparent 100%)',
			'login-gradient':
				'linear-gradient(to bottom, #991E23 0%, white 80%, white 100%)',
			'register-gradient':
				'linear-gradient(to bottom, #FA9802 0%, white 80%, white 100%)',
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
		screens: {
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			smx: '500px',
			// => @media (min-width: 640px) { ... }

			md: '710px',
			// => @media (min-width: 768px) { ... }

			smd: '830px',

			lg: '985px',
			// => @media (min-width: 1024px) { ... }

			xl: '1150px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1500px',
			// => @media (min-width: 1536px) { ... }

			'3xl': '1800px',

			'4xl': '1900px',

			'5xl': '2100px',
		},
	},
	plugins: [],
};
