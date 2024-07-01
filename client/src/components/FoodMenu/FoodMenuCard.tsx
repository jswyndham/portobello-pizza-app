import { useEffect, useState } from 'react';

interface FoodMenuItem {
	_id: string;
	menuCategory: string;
	pizzaType?: string;
	name: string;
	imageUrl?: string;
	ingredients: string[];
	price: number;
}

const FoodMenuCard: React.FC = () => {
	const [foodItems, setFoodItems] = useState<FoodMenuItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchFoodItems = async () => {
			try {
				const response = await fetch(
					'http://localhost:5001/api/v1/foodMenu'
				);
				const text = await response.text();
				console.log('API response text:', text); // Log the raw response text
				const data = JSON.parse(text);
				console.log('API response JSON:', data); // Log the parsed response
				if (Array.isArray(data)) {
					setFoodItems(data);
				} else {
					console.error('API response is not an array:', data);
					setError('Unexpected API response format.');
				}
			} catch (error) {
				console.error('Error fetching food items:', error);
				setError('Error fetching food items.');
			} finally {
				setLoading(false); // Set loading to false after fetching
			}
		};

		fetchFoodItems();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (foodItems.length === 0) {
		return <div>No food items found.</div>;
	}

	return (
		<section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 2xl:gap-14 justify-center items-center">
			{foodItems.map((food) => (
				<article
					key={food._id}
					className="w-80 h-fit border border-slate-400 rounded-lg p-2 bg-slate-200 bg-opacity-70"
				>
					<div className="w-full h-full flex flex-col">
						{food.imageUrl ? (
							<img
								src={food.imageUrl || '/placeholder.jpg'}
								alt={food.name}
								className="h-56 w-full object-cover border border-slate-300 rounded-md mb-4"
							/>
						) : (
							<img
								src={food.imageUrl || '/placeholder.jpg'}
								alt="No image available"
								className="h-56 w-full object-cover flex border border-slate-300 bg-white items-center justify-center rounded-md text-xl font-cinzel mb-4"
							/>
						)}

						<div className="flex flex-col justify-between items-center p-3">
							<h2 className="text-lg font-bold font-montserrat">
								{food.name}
							</h2>
							<div className="h-20 flex items-center my-3">
								<p className="text-lg text-gray-600 text-center flex-grow font-sans font-bold">
									{food.ingredients.join(', ')}
								</p>
							</div>
							<div className="flex flex-row text-xl text-green-600 mt-2 flex-grow font-cinzel">
								<p>฿ </p>
								<p className="font-semibold">{food.price}</p>
							</div>
						</div>
					</div>
				</article>
			))}
		</section>
	);
};

export default FoodMenuCard;
