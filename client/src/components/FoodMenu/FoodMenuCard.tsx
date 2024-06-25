import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
				const response = await axios.get(
					'localhost:5001/api/v1/foodMenu'
				);
				console.log('API response:', response.data); // Log the response
				if (Array.isArray(response.data)) {
					setFoodItems(response.data);
				} else {
					console.error(
						'API response is not an array:',
						response.data
					);
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
		<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
			{foodItems.map((food) => (
				<article
					key={food._id}
					className="w-80 h-96 border border-slate-400 rounded-lg"
				>
					<img
						src={food.imageUrl || '/placeholder.jpg'}
						alt={food.name}
						className="h-3/5 w-full object-cover m-2 border border-slate-300"
					/>
					<div className="flex flex-col justify-center items-center p-3">
						<h2 className="text-lg font-bold">{food.name}</h2>
						<p className="text-sm text-gray-600">
							{food.ingredients.join(', ')}
						</p>
						<p className="text-lg font-semibold mt-2">
							${food.price.toFixed(2)}
						</p>
					</div>
				</article>
			))}
		</section>
	);
};

export default FoodMenuCard;
