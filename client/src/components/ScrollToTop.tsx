import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
	const { pathname, search, hash } = useLocation();

	useEffect(() => {
		if (hash) {
			const element = document.getElementById(hash.replace('#', ''));
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			window.scrollTo(0, 0);
		}
	}, [pathname, search, hash]);

	return null;
};

export default ScrollToTop;
