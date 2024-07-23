import { menuCategories } from '../../data/menuCategories';
import { Link } from 'react-router-dom';

function MenuCards() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 justify-center">
			{menuCategories.map((category) => (
				<Link
					to={`/foodmenu${category.link}`}
					key={category.title}
					className="block w-full"
				>
					<div className="w-full h-36 xl:h-52 border border-primary rounded-lg shadow-lg drop-shadow-lg overflow-hidden">
						<img
							src={category.imageUrl}
							alt={category.title}
							loading="lazy"
							className="relative w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-1"
						/>

						<h2 className="absolute top-0 right-0 diagonal-bg h-36 xl:h-52 w-fit py-1 px-4 rounded-md text-2xl xl:text-3xl font-semibold text-white">
							{category.title}
						</h2>
					</div>
				</Link>
			))}
		</div>
	);
}

export default MenuCards;
