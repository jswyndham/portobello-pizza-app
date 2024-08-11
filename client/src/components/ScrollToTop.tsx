import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
	const { pathname, search, hash } = useLocation(); // set the path location

	useEffect(() => {
		window.scrollTo(0, 0); // Scroll the window to the top
	}, [pathname, search, hash]); // Effect runs every time the pathname, search, or hash tag changes

	return null; // Component doesn't render anything in the UI
};

export default ScrollToTop;
