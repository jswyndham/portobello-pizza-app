import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
	const { pathname } = useLocation(); // set the path location

	useEffect(() => {
		window.scrollTo(0, 0); // Scroll the window to the top
	}, [pathname]); // Effect runs every time the pathname changes

	return null; // Component doesn't render anything in the UI
};

export default ScrollToTop;
