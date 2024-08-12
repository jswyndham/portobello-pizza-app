import { useEffect } from 'react';
import HeadingOne from '../HeadingOne';
import MenuCards from './MenuCards';
import { useLocation } from 'react-router-dom';

function HomeMidSection() {
	const location = useLocation();

	useEffect(() => {
		if (location.pathname.includes('/')) {
			window.scrollTo(0, 0);
		}
	}, [location.pathname]);

	return (
		<article className="w-full h-fit flex justify-center">
			<div className="w-10/12 flex flex-col text-center">
				<HeadingOne headingOneText={"Porto Bello's Food Menu"} />
				<div className="px-2 py-8 lg:p-12 2xl:px-32 2xl:py-16">
					<MenuCards />
				</div>
			</div>
		</article>
	);
}

export default HomeMidSection;
