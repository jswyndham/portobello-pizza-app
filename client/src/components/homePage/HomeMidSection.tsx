import HeadingOne from '../HeadingOne';
import ScrollToTop from '../ScrollToTop';
import MenuCards from './MenuCards';

function HomeMidSection() {
	return (
		<article className="w-full h-fit flex justify-center">
			<div className="w-10/12 flex flex-col text-center">
				<HeadingOne headingOneText={"Porto Bello's Food Menu"} />

				<div className="px-2 py-8 lg:p-12 2xl:px-32 2xl:py-16">
					<ScrollToTop />
					<MenuCards />
				</div>
			</div>
		</article>
	);
}

export default HomeMidSection;
