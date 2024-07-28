import portoBelloWine from '/images/portobello-wine-cheers.jpg';
import pizzaAndWine from '/images/pizza-and-wine-2.jpg';
import pastaFresh from '/images/pasta-fresh-2.jpg';
import pizzaChef from '/images/portobello-pizza-making.jpg';
import pizzaTable from '/images/pizza-table.jpg';
import cocktails from '/images/cocktails.jpg';

export interface ImageCarouselSchemaItem {
	title: string;
	image: string;
	alt: string;
}

const imageCarouselData = (): ImageCarouselSchemaItem[] => [
	{
		title: 'Koh Tao locals at Portobello making a toast',
		alt: 'portobello customer cheers',
		image: portoBelloWine,
	},
	{
		title: 'Portobello serves great wine and pizza',
		alt: 'portobello wine and pizza',
		image: pizzaAndWine,
	},
	{
		title: 'Portobello serves delicious pasta on Koh Tao Island',
		alt: 'portobello pasta',
		image: pastaFresh,
	},
	{
		title: 'Portobello makes the best pizza on Koh Tao',
		alt: 'portobello pizza chef',
		image: pizzaChef,
	},
	{
		title: 'A group eating pizza at Portobello',
		alt: 'group eating pizza at Portobello',
		image: pizzaTable,
	},
	{
		title: 'A Coffee Martini & White Passion-fruit Martini at Portobello',
		alt: 'Coffee Martini & White Passion-fruit Martini',
		image: cocktails,
	},
];

export default imageCarouselData;
