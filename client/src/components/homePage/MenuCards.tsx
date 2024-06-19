import { menuCategories } from '../../data/menuCategories';
import { Link } from 'react-router-dom';

function MenuCards() {
	return (
		<div className="flex flex-wrap justify-center gap-4 my-20">
			{menuCategories.map((category) => (
				<Link to={category.link} key={category.title}>
					<div className="w-60 h-80 bg-white border border-slate-300 rounded-lg overflow-hidden shadow-lg">
						<img
							src={category.imageUrl}
							alt={category.title}
							className="w-full h-2/3 object-cover"
						/>
						<div className="p-4">
							<h2 className="text-xl font-semibold">
								{category.title}
							</h2>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}

export default MenuCards;
