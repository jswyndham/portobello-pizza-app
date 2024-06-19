import pizzaOven from '/images/pizza-eneida-nieves-large.jpg';
import portoBelloWine from '/images/portobello-wine-cheers.jpg';
import pizzaAndWine from '/images/pizza-and-wine-2.jpg';

export interface ImageCarouselSchemaItem {
	title: string;
	image: string;
	alt: string;
}

const imageCarouselData = (): ImageCarouselSchemaItem[] => [
	{
		title: 'Pizza in oven',
		alt: 'pizza in oven',
		image: pizzaOven,
	},
	{
		title: 'Portobello customer cheers',
		alt: 'portobello customer cheers',
		image: portoBelloWine,
	},
	{
		title: 'Portobello wine and pizza',
		alt: 'portobello wine and pizza',
		image: pizzaAndWine,
	},
];

export default imageCarouselData;
