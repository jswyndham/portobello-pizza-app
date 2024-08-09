import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';
import { motion, AnimatePresence } from 'framer-motion';
import { EditFoodItem } from '../menuItems';
import { useAuth } from '../../context/AuthContext';
import { FoodMenuItem } from '../../types/foodItemInterfaces';
import Loading from '../Loading';
import ItemNotFound from '../itemNotFound/ItemNotFound';
import ErrorMessage from '../ErrorMessage';

interface FoodMenuCardProps {
	category: string;
}

// Component for displaying food menu items
const FoodMenuCard: FC<FoodMenuCardProps> = ({ category }) => {
	// Card states for food items, loading state, and error state
	const [foodItems, setFoodItems] = useState<FoodMenuItem[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Pagination and category states
	const [page] = useState(1);
	const [selectedCategory] = useState<string>(category);

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
	const { token } = state;
	const { isLoggedIn } = state;

	// Motion animation states and variants
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

	// Trigger animation on component mount
	useEffect(() => {
		setAnimationTriggered(true);
	}, []);

	// Fetch food items from API on component mount or when category changes
	useEffect(() => {
		const fetchFoodItems = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					`${
						import.meta.env.VITE_API_BASE_URL
					}/foodMenu?page=${page}&limit=12&menuCategory=${selectedCategory}`,
					{
						method: 'GET',
					}
				);

				const data = await response.json();

				if (response.ok && data.items && Array.isArray(data.items)) {
					setFoodItems(data.items);
				} else {
					toast.error('API response is not in the expected format.');
					setError('Unexpected API response format.');
				}
			} catch (error) {
				toast.error('Error fetching food items.');
				setError('Error fetching food items.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchFoodItems();
	}, [page, selectedCategory, token]);

	// Submit menu item deletion
	const onSubmitDelete = async (id: string) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/foodMenu/${id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${state.token}`,
					},
					credentials: 'include',
				}
			);
			if (response.ok) {
				// Success toast notification
				toast.success(`You have successfully deleted a menu item!`);
				// Remove the deleted item from the state
				setFoodItems((prevItems) =>
					prevItems.filter((item) => item._id !== id)
				);
			} else {
				const errorData = await response.json();
				// Error toast notification
				toast.error(`Failed to delete menu item: ${errorData.message}`);
				setError(`Failed to delete menu item:', ${errorData.message}`);
			}
		} catch (error) {
			toast.error('Error deleting item');
			setError('Error deleting item');
		}
	};

	// Submit menu item to edit
	const onSubmitEdit = async (id: string) => {
		setIsLoading(true);
		try {
			if (!token) {
				toast.error('No token available');
				return;
			}

			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/foodMenu/${id}`,
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
				setFoodItemToEdit(data.foodMenuItem);
				setIsEditOpen(true);
			} else {
				const errorData = await response.json();
				toast.error(`Failed to get menu item: ${errorData.message}`);
				setError(`Failed to get menu item: ${errorData.message}`);
			}
		} catch (error) {
			toast.error('Error finding menu item');
			setError('Error finding menu item');
		} finally {
			setIsLoading(false);
		}
	};

	// Handle editing a menu item
	const handleEdit = (foodItem: FoodMenuItem) => {
		onSubmitEdit(foodItem._id);
		navigate(`/admin/editfood/${foodItem._id}`);
	};

	// Handle delete button click
	const handleDelete = (id: string) => {
		setIsDeleteOpen(true);
		setItemIdToDelete(id);
	};

	// Confirm deletion of a menu item
	const confirmDelete = () => {
		if (itemIdToDelete) {
			onSubmitDelete(itemIdToDelete);
			setIsDeleteOpen(false);
			setItemIdToDelete(null);
		}
	};

	// Render loading state
	if (isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	// Render error state
	if (error) {
		return <ErrorMessage errorMessage={error} />;
	}

	// Render empty state if no food items found
	if (foodItems.length === 0) {
		return <ItemNotFound item="food menu item" />;
	}

	// Render food items
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
					className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 2xl:gap-14 mx-auto justify-center items-center"
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
								{/* If user is logged in, show edit and delete buttons */}
								{isLoggedIn && (
									<article className="absolute w-full bg-slate-500 bg-opacity-50 backdrop-blur-sm">
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
									</article>
								)}

								{/* Display food item details */}
								<article className="w-full h-full flex flex-col">
									{food.imageUrl ? (
										<img
											src={
												food.imageUrl ||
												'/placeholder.jpg'
											}
											alt={food.name}
											loading="lazy"
											className="h-40 md:h-56 w-full object-cover rounded-t-md"
										/>
									) : (
										<img
											src={
												food.imageUrl ||
												'/placeholder.jpg'
											}
											alt="No image available"
											loading="lazy"
											className="h-28 md:h-56 w-full object-cover flex bg-white items-center justify-center rounded-t-md text-xl font-cinzel mb-4"
										/>
									)}

									<article className="flex flex-col justify-between items-center">
										<div className="w-full bg-food-menu-gradient border-y-2 border-yellow-500 text-center drop-shadow-lg">
											<h2 className="text-xl font-semibold font-cinzel text-white py-1 lg:py-2 ">
												{food.name}
											</h2>
										</div>
										<div className="h-16 lg:h-20 flex-grow items-center my-2 px-5 lg:py-1">
											<p className="text-md lg:text-lg text-slate-700 text-center flex-grow font-dmsans py-1">
												{food.ingredients.join(', ')}
											</p>
										</div>
										<div className="w-full flex flex-row text-xl text-black bg-slate-200 flex-grow font-cinzel py-2 px-4">
											<p>฿ </p>
											<p className="font-semibold">
												{food.price}
											</p>
										</div>
									</article>
								</article>
							</motion.article>
						))}
					</AnimatePresence>
				</motion.div>

				{/* Render edit modal if edit is open */}
				{isEditOpen && foodItemToEdit && <EditFoodItem />}

				{/* Render delete confirmation modal if delete is open */}
				<AnimatePresence>
					{isDeleteOpen && (
						<ConfirmDeleteModal
							message="Are you sure you want to delete this menu item?"
							onConfirm={confirmDelete}
							onCancel={() => setIsDeleteOpen(false)}
						/>
					)}
				</AnimatePresence>
			</section>
		</>
	);
};

export default FoodMenuCard;
