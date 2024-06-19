import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imageCarouselData, {
	ImageCarouselSchemaItem,
} from '../../data/imageCarouselData';

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
		<div className="w-full h-4/6 z-0">
			<Slider key={key} {...settings}>
				{images.map((image, index) => (
					<div key={index} className="">
						<img
							title={image.title}
							src={image.image}
							alt={`Slide - ${image.alt}`}
							className="w-full"
						/>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default ImageCarousel;
