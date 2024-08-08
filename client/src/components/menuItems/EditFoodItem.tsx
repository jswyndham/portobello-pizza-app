import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MENU_CATEGORY, MEAT_OR_VEG } from '../../../../server/src/constants';
import IngredientList from './IngredientList';
import ImageUpload from './ImageUpload';
import { FoodMenuFormData } from '../../types/foodItemInterfaces';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading';
import { useCache } from '../../context/cacheContext';
import ErrorMessage from '../ErrorMessage';
import { ToastContainer, toast } from 'react-toastify';

const EditFoodItem = () => {
	const { id } = useParams<{ id: string }>();
	const { state } = useAuth();
	const { token } = state;
	const navigate = useNavigate();
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const { cache, setCache } = useCache();

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<FoodMenuFormData>({
		defaultValues: {
			menuCategory: '',
			pizzaType: '',
			name: '',
			imageUrl: '',
			ingredients: [],
			price: 0,
		},
	});

	// ********* useEffect hooks *************

	// Fetch the food item object and set cache in the browser
	useEffect(() => {
		const fetchFoodMenuItem = async () => {
			setIsLoading(true);
			if (id) {
				const cacheKey = `foodMenuItem-${id}`;
				if (cache[cacheKey]) {
					const item = cache[cacheKey];
					reset({
						menuCategory: item.menuCategory || '',
						pizzaType: item.pizzaType || '',
						name: item.name || '',
						imageUrl: item.imageUrl || '',
						ingredients: item.ingredients || [],
						price: item.price || 0,
					});
					setImagePreview(item.imageUrl || null);
					setIngredients(item.ingredients || []);
					setIsLoading(false);
				} else {
					try {
						if (!token) {
							setError(
								'You are not authorized to access this page'
							);
							setIsLoading(false);
							return;
						}

						setIsLoading(true);
						const response = await fetch(
							`${
								import.meta.env.VITE_API_BASE_URL
							}/foodMenu/${id}`,
							{
								method: 'GET',
								headers: {
									Authorization: `Bearer ${token}`,
								},
								credentials: 'include',
							}
						);
						const data = await response.json();

						if (data && data.items) {
							// Change this line to access the correct property
							const item = data.items; // Adjust how the data is accessed
							reset({
								menuCategory: item.menuCategory || '',
								pizzaType: item.pizzaType || '',
								name: item.name || '',
								imageUrl: item.imageUrl || '',
								ingredients: item.ingredients || [],
								price: item.price || 0,
							});
							setImagePreview(item.imageUrl || null);
							setIngredients(item.ingredients || []);
							setCache(cacheKey, item); // Cache the fetched item
						} else {
							toast.error('Food menu item not found');
							setError('Food menu item not found');
						}
					} catch (error) {
						toast.error('Error fetching food menu item');
						setError('Error fetching food menu item');
					} finally {
						setIsLoading(false);
					}
				}
			}
		};

		fetchFoodMenuItem();
	}, [id, reset, cache, setCache, token]);

	// Set ingredient values
	useEffect(() => {
		setValue('ingredients', ingredients);
	}, [ingredients, setValue]);

	// ************ submit handler ************

	// Submit new values for the existing food menu item
	const onSubmit: SubmitHandler<FoodMenuFormData> = async (data) => {
		try {
			if (!token) {
				setError('You are not authorized to access this page');
				setIsLoading(false);
				return;
			}

			const formData = {
				...data,
				ingredients: ingredients.filter(
					(ingredient) => ingredient.trim() !== ''
				),
			};

			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/foodMenu/${id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${state.token}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				toast.success('Your menu item was successfully edited!');
				reset();
				navigate('/');
			} else {
				const errorData = await response.json();

				toast.error('Failed to submit menu item:', errorData.message);
				setError(`Failed to submit menu item:, ${errorData.message}`);
			}
		} catch (error) {
			toast.error('Error submitting form');
			setError('Error submitting form');
		}
	};

	// *********** Handlers ************

	// Handle image upload
	const handleImageUrl = (file: any) => {
		const fileUrl = file.secure_url;
		setImagePreview(fileUrl);
		setValue('imageUrl', fileUrl);
	};

	// Add a new ingredient
	const handleAddIngredient = () => {
		setIngredients((prevIngredients) => [...prevIngredients, '']);
	};

	// Remove an ingredient by index
	const handleRemoveIngredient = (index: number) => {
		setIngredients((prevIngredients) =>
			prevIngredients.filter((_, i) => i !== index)
		);
	};

	// Change an ingredient value by index
	const handleIngredientChange = (index: number, value: string) => {
		setIngredients((prevIngredients) =>
			prevIngredients.map((ingredient, i) =>
				i === index ? value : ingredient
			)
		);
	};

	// Loading Screen
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
			<section className="flex justify-center items-center w-screen sm:w-full h-fit pt-24 2xl:pt-0">
				<form
					className="w-11/12 md:w-9/12 lg:w-6/12 2xl:w-4/12 z-10 flex flex-col border shadow-md shadow-slate-400 rounded-lg px-6 py-8 mb-10 bg-slate-50"
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* Menu Category Label and Select Dropdown */}
					<label
						htmlFor="menuCategory"
						className="font-handlee-regular text-lg p-2 font-semibold"
					>
						Menu Category
					</label>
					<select
						{...register('menuCategory', { required: true })}
						className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
					>
						<option value="" disabled>
							-- Select --
						</option>
						{Object.values(MENU_CATEGORY).map((category, index) => (
							<option key={index} value={category.value}>
								{category.label}
							</option>
						))}
					</select>
					{/* Error message for menu category */}
					{errors.menuCategory && (
						<p className="text-md text-red-500">
							Menu category is required.
						</p>
					)}

					{/* Meat or Veg Section */}
					<label
						htmlFor="pizzaType"
						className="font-handlee-regular text-lg p-2 font-semibold"
					>
						'Meat' or 'Veg'
					</label>
					<select
						{...register('pizzaType')}
						className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
					>
						<option value="" disabled>
							-- Select --
						</option>
						{Object.values(MEAT_OR_VEG).map((category, index) => (
							<option key={index} value={category.value}>
								{category.label}
							</option>
						))}
					</select>

					{/* Menu Item Name Section */}
					<label
						htmlFor="name"
						className="font-handlee-regular text-lg p-2 font-semibold"
					>
						Menu Item Name
					</label>
					<input
						{...register('name', { required: true })}
						placeholder="Enter name..."
						className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
					/>
					{/* Error message for item name */}
					{errors.name && (
						<p className="text-md text-red-500">
							Name is required.
						</p>
					)}

					{/* Image Upload Section */}
					<ImageUpload
						imagePreview={imagePreview}
						setImageUrl={handleImageUrl}
					/>

					{/* Ingredient List Section */}
					<IngredientList
						ingredients={ingredients}
						onAddIngredient={handleAddIngredient}
						onRemoveIngredient={handleRemoveIngredient}
						onIngredientChange={handleIngredientChange}
					/>

					{/* Price Section */}
					<label
						htmlFor="price"
						className="font-handlee-regular text-lg p-2 font-semibold"
					>
						Price
					</label>
					<input
						type="number"
						{...register('price', { required: true })}
						placeholder="Enter price..."
						className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
					/>
					{/* Error message for price */}
					{errors.price && (
						<p className="text-md text-red-500">
							Price is required.
						</p>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isSubmitting}
						className={`w-11/12 my-3 p-2 mx-auto bg-blue-500 border border-slate-200 text-white text-lg font-bold rounded-lg drop-shadow-lg hover:shadow-lg hover:shadow-slate-400 hover:bg-blue-600 hover:text-slate-100 disabled:shadow-none focus:shadow-md focus:shadow-slate-400 focus:text-slate-200 ${
							isSubmitting ? 'opacity-50' : 'opacity-100'
						}`}
					>
						{isSubmitting ? 'Submitting...' : 'Submit'}
					</button>
				</form>
			</section>
		</>
	);
};

export default EditFoodItem;
