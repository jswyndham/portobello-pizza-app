import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imageCarouselData, {
	ImageCarouselSchemaItem,
} from '../../data/imageCarouselData';
import HeadingTwo from '../HeadingTwo';

const ImageCarousel: React.FC = () => {
	const [key, setKey] = useState<number>(0);

	const images: ImageCarouselSchemaItem[] = imageCarouselData();

	useEffect(() => {
		const handleResize = () => {
			// Reinitialize the component key, causing a re-render to better handle resizing adjustment
			setKey((prevKey) => prevKey + 1);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		speed: 1000,
		fade: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
	};

	return (
		<div className="w-full lg:w-10/12 2xl:w-9/12 px-2 xl:my-24 flex flex-col justify-center items-center mx-auto">
			{/* Heading */}
			<HeadingTwo headingTwoText={'Porto Bello - Image Gallery'} />

			<div className="w-full lg:w-10/12 py-20 px-8">
				<Slider key={key} {...settings}>
					{images.map((image, index) => (
						<div
							key={index}
							className="flex justify-center items-center"
						>
							<img
								title={image.title}
								src={image.image}
								alt={`Slide - ${image.alt}`}
								className="w-full object-cover"
							/>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default ImageCarousel;
