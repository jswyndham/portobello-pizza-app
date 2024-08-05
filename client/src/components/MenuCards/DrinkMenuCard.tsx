import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';
import { motion, AnimatePresence } from 'framer-motion';
import { EditFoodItem } from '../menuItems';
import { DrinkMenuItem } from '../../types/drinkItemInterfaces';
import { useAuth } from '../../context/AuthContext';
import Loading from '../Loading';
import ItemNotFound from '../itemNotFound/ItemNotFound';
import ErrorMessage from '../ErrorMessage';

interface DrinkMenuCardProps {
	category: string;
}

const DrinkMenuCard: FC<DrinkMenuCardProps> = ({ category }) => {
	const [drinkItems, setDrinkItems] = useState<DrinkMenuItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedCategory] = useState<string>(category);
	const [page] = useState(1);
	const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
	const [drinkItemToEdit, setDrinkItemToEdit] =
		useState<DrinkMenuItem | null>(null);
	const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
	const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);
	const { state } = useAuth();
	const { isLoggedIn, token } = state;

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

	useEffect(() => {
		const fetchDrinkItems = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					`http://localhost:5001/api/v1/drinkMenu?page=${page}&limit=12&drinkCategory=${selectedCategory}`,
					{ method: 'GET' }
				);
				const data = await response.json();

				if (data.items && Array.isArray(data.items)) {
					setDrinkItems(data.items);
				} else {
					setError('Unexpected API response format.');
				}
			} catch (error) {
				setError('Error fetching drink items.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchDrinkItems();
	}, [page, selectedCategory]);

	const onSubmitDelete = async (id: string) => {
		try {
			if (!token) {
				setError('No token available');
				toast.error('No token available');
				return;
			}

			const response = await fetch(
				`http://localhost:5001/api/v1/drinkMenu/${id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					credentials: 'include',
				}
			);
			if (response.ok) {
				toast.success(`You have successfully deleted a menu item!`);
				setDrinkItems((prevItems) =>
					prevItems.filter((item) => item._id !== id)
				);
			} else {
				const errorData = await response.json();
				setError(`Failed to delete menu item: ${errorData.message}`);
				toast.error(`Failed to delete menu item: ${errorData.message}`);
			}
		} catch (error) {
			setError('Error deleting item.');
			toast.error('Error deleting item.');
		}
	};

	const onSubmitEdit = async (id: string) => {
		try {
			if (!token) {
				toast.error('No token available');
				return;
			}

			const response = await fetch(
				`http://localhost:5001/api/v1/drinkMenu/${id}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					credentials: 'include',
				}
			);
			if (response.ok) {
				const data = await response.json();

				setDrinkItemToEdit(data);
				setIsEditOpen(true);
			} else {
				const errorData = await response.json();
				setError(`Failed to get menu item: ${errorData.message}`);
				toast.error(`Failed to get menu item: ${errorData.message}`);
			}
		} catch (error) {
			setError('Error finding menu item.');
			toast.error('Error finding menu item.');
		}
	};

	const handleEdit = (drinkItem: DrinkMenuItem) => {
		onSubmitEdit(drinkItem._id);
		navigate(`/admin/editdrink/${drinkItem._id}`);
	};

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

	if (isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	if (error) {
		return <ErrorMessage errorMessage={error} />;
	}

	if (drinkItems.length === 0) {
		return <ItemNotFound item="drink menu item" />;
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
			<section className="w-full pt-8 flex flex-col justify-center items-center">
				<motion.div
					initial="hidden"
					animate={animationTriggered ? 'visible' : 'hidden'}
					variants={contentFadeInVariants}
					className="w-11/12 h-fit grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-1 justify-center items-center mb-20 bg-white"
				>
					<AnimatePresence>
						{drinkItems.map((drink) => (
							<motion.article
								key={drink._id}
								variants={fadeOutVariants}
								initial="initial"
								exit="exit"
								layout
							>
								{isLoggedIn ? (
									<div className="flex flex-col h-fit">
										<div className="w-full h-full flex justify-end items-start z-10 p-1 bg-gray-300">
											<div
												onClick={() =>
													handleEdit(drink)
												}
												className="w-7 h-7 flex justify-center items-center bg-yellow-500 text-white rounded-full hover:cursor-pointer mx-2"
											>
												<FiEdit />
											</div>
											<div
												onClick={() =>
													handleDelete(drink._id)
												}
												className="w-7 h-7 flex justify-center items-center bg-red-500 text-white rounded-full text-xl hover:cursor-pointer mx-2"
											>
												<RxCross2 />
											</div>
										</div>
										<div className="relative flex flex-row h-fit py-2 border-y-2 border-slate-600 bg-card-gradient bg-opacity-70">
											<div className="w-full text-left drop-shadow-lg py-1 pl-4">
												<h2 className="text-lg lg:text-xl font-semibold font-cinzel text-black">
													{drink.name}
												</h2>
											</div>
											<div className="flex flex-row justify-end text-lg lg:text-xl text-black flex-grow font-cinzel py-1 px-4">
												<p>฿ </p>
												<p className="font-semibold">
													{drink.price}
												</p>
											</div>{' '}
										</div>
									</div>
								) : (
									<div className="relative flex flex-row h-fit py-2 border-y-2 border-slate-600 bg-card-gradient bg-opacity-70">
										<div className="w-full text-left drop-shadow-lg py-1 pl-4">
											<h2 className="text-lg lg:text-xl font-semibold font-cinzel text-black">
												{drink.name}
											</h2>
										</div>
										<div className="flex flex-row justify-end text-lg lg:text-xl text-black flex-grow font-cinzel py-1 px-4">
											<p>฿ </p>
											<p className="font-semibold">
												{drink.price}
											</p>
										</div>{' '}
									</div>
								)}
							</motion.article>
						))}
					</AnimatePresence>
				</motion.div>

				{isEditOpen && drinkItemToEdit && <EditFoodItem />}

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

export default DrinkMenuCard;
