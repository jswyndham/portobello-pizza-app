import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';
import { motion, AnimatePresence } from 'framer-motion';
import { AddMenuItem } from '../newFoodItem';
import { useAuth } from '../../context/AuthContext';

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
	// Card states
	const [foodItems, setFoodItems] = useState<FoodMenuItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Pagination states
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// Edit state
	const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
	const [foodItemToEdit, setFoodItemToEdit] = useState<FoodMenuItem | null>(
		null
	);

	// Delete states
	const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
	const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);

	// Auth context & global state
	const { state } = useAuth();
	const { isLoggedIn } = state;

	// Motion animation
	const [animationTriggered, setAnimationTriggered] = useState(false);
	const contentFadeInVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delay: 0.5, duration: 2 } },
	};

	const fadeOutVariants = {
		initial: { opacity: 1, scale: 1 },
		exit: {
			opacity: 0,
			scale: 0.8,
			transition: { duration: 0.5 },
		},
	};

	const navigate = useNavigate();

	useEffect(() => {
		setAnimationTriggered(true);
	}, []);

	// Fetch menu Items
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

	// Submit menu item deletion
	const onSubmitDelete = async (id: string) => {
		try {
			const response = await fetch(
				`http://localhost:5001/api/v1/foodMenu/${id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${state.token}`,
					},
					credentials: 'include',
				}
			);
			if (response.ok) {
				// Success modal
				toast.success(`You have successfully deleted a menu item!`);
				// Remove the deleted item from the state
				setFoodItems((prevItems) =>
					prevItems.filter((item) => item._id !== id)
				);
			} else {
				const errorData = await response.json();
				// Error modal
				toast.error(`Menu item was not deleted`);
				console.error('Failed to delete menu item:', errorData.message);
			}
		} catch (error) {
			console.error('Error deleting item:', error);
		}
	};

	// Submit menu item to edit
	const onSubmitEdit = async (id: string) => {
		try {
			const response = await fetch(
				`http://localhost:5001/api/v1/foodMenu/${id}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${state.token}`,
					},
					credentials: 'include',
				}
			);
			if (response.ok) {
				const data = await response.json();
				setFoodItemToEdit(data);
				setIsEditOpen(true);
			} else {
				const errorData = await response.json();
				console.error('Failed to get menu item:', errorData.message);
			}
		} catch (error) {
			console.error('Error finding menu item:', error);
		}
	};

	// Handle editing
	const handleEdit = (foodItem: FoodMenuItem) => {
		onSubmitEdit(foodItem._id);
		navigate(`/editmenu/${foodItem._id}`);
	};

	// Handle delete functions
	const handleDelete = (id: string) => {
		setIsDeleteOpen(true);
		setItemIdToDelete(id);
	};

	const confirmDelete = () => {
		if (itemIdToDelete) {
			onSubmitDelete(itemIdToDelete);
			setIsDeleteOpen(false);
			setItemIdToDelete(null);
		}
	};

	// Handle pagination
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

	// TODO: Build loading screen
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
		<>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				className="toast-container"
				toastClassName="toast"
			/>
			<section className="pt-8">
				<motion.div
					initial="hidden"
					animate={animationTriggered ? 'visible' : 'hidden'}
					variants={contentFadeInVariants}
					className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 2xl:gap-14 justify-center items-center"
				>
					<AnimatePresence>
						{foodItems.map((food) => (
							<motion.article
								key={food._id}
								variants={fadeOutVariants}
								initial="initial"
								exit="exit"
								layout
								className="relative w-80 h-fit border border-slate-400 rounded-lg bg-card-gradient bg-opacity-70"
							>
								{isLoggedIn && (
									<div className="absolute w-full bg-slate-500 bg-opacity-50">
										<div className="flex justify-between p-2">
											<div
												onClick={() => handleEdit(food)}
												className="w-8 h-8 flex justify-center items-center bg-yellow-500 text-white rounded-full hover:cursor-pointer"
											>
												<FiEdit />
											</div>
											<div
												onClick={() =>
													handleDelete(food._id)
												}
												className="w-8 h-8 flex justify-center items-center bg-red-500 text-white rounded-full text-xl hover:cursor-pointer"
											>
												<RxCross2 />
											</div>
										</div>
									</div>
								)}

								<div className="w-full h-full flex flex-col">
									{food.imageUrl ? (
										<img
											src={
												food.imageUrl ||
												'/placeholder.jpg'
											}
											alt={food.name}
											className="h-40 md:h-56 w-full object-cover rounded-t-md mb-4"
										/>
									) : (
										<img
											src={
												food.imageUrl ||
												'/placeholder.jpg'
											}
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
							</motion.article>
						))}
					</AnimatePresence>
				</motion.div>

				{isEditOpen && foodItemToEdit && (
					<AddMenuItem initialData={foodItemToEdit} />
				)}

				<AnimatePresence>
					{isDeleteOpen && (
						<ConfirmDeleteModal
							message="Are you sure you want to delete this menu item?"
							onConfirm={confirmDelete}
							onCancel={() => setIsDeleteOpen(false)}
						/>
					)}
				</AnimatePresence>

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
		</>
	);
};

export default FoodMenuCard;
