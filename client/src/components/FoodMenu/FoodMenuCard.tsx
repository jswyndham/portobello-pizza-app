import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiEdit } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';

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
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const { state } = useAuth();
	const { isLoggedIn } = state;

	useEffect(() => {
		const fetchFoodItems = async () => {
			try {
				const response = await fetch(
					`http://localhost:5001/api/v1/foodMenu?page=${page}&limit=12`
				);
				const data = await response.json();
				console.log('API response JSON:', data); // Log the parsed response

				if (data.items && Array.isArray(data.items)) {
					setFoodItems(data.items);
					setTotalPages(data.totalPages);
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
	}, [page]);

	const handleNextPage = () => {
		if (page < totalPages) {
			setPage(page + 1);
		}
	};

	const handlePrevPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

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
		<section className="pt-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 2xl:gap-14 justify-center items-center">
				{foodItems.map((food) => (
					<article
						key={food._id}
						className="relative w-80 h-fit border border-slate-400 rounded-lg bg-card-gradient bg-opacity-70"
					>
						{isLoggedIn && (
							<div className="absolute z-20 w-full bg-slate-500 bg-opacity-50">
								<div className="flex justify-between p-2">
									<div className="w-8 h-8 flex justify-center items-center bg-yellow-500 text-white rounded-full hover:cursor-pointer">
										<FiEdit />
									</div>
									<div className="w-8 h-8 flex justify-center items-center bg-red-500 text-white rounded-full text-xl hover:cursor-pointer">
										<RxCross2 />
									</div>
								</div>
							</div>
						)}
						<div className="w-full h-full flex flex-col">
							{food.imageUrl ? (
								<img
									src={food.imageUrl || '/placeholder.jpg'}
									alt={food.name}
									className="h-40 md:h-56 w-full object-cover rounded-t-md mb-4"
								/>
							) : (
								<img
									src={food.imageUrl || '/placeholder.jpg'}
									alt="No image available"
									className="h-28 md:h-56 w-full object-cover flex bg-white items-center justify-center rounded-t-md text-xl font-cinzel mb-4"
								/>
							)}

							<div className="flex flex-col justify-between items-center">
								<div className="w-full -mt-9 bg-food-menu-gradient border-y border-slate-300 text-center drop-shadow-lg">
									<h2 className="text-xl font-bold font-dmsans text-white py-1">
										{food.name}
									</h2>
								</div>
								<div className="h-20 flex items-center my-2">
									<p className="text-lg text-slate-700 text-center flex-grow font-sans font-bold">
										{food.ingredients.join(', ')}
									</p>
								</div>
								<div className="flex flex-row text-xl text-primary flex-grow font-cinzel pb-4">
									<p>฿ </p>
									<p className="font-semibold">
										{food.price}
									</p>
								</div>
							</div>
						</div>
					</article>
				))}
			</div>
			<div className="flex justify-between pt-10 pb-16 px-4 text-xl font-semibold text-yellow-400">
				<button
					type="button"
					disabled={page === 1}
					onClick={handlePrevPage}
					className="underline underline-offset-4 hover:cursor-pointer hover:text-yellow-600 active:text-blue-600"
				>
					Previous
				</button>
				<button
					type="button"
					disabled={page === totalPages}
					onClick={handleNextPage}
					className="underline underline-offset-4 hover:cursor-pointer hover:text-yellow-600 active:text-blue-600"
				>
					Next
				</button>
			</div>
		</section>
	);
};

export default FoodMenuCard;
