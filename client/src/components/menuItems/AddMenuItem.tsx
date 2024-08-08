import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldErrorsImpl } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
	MENU_CATEGORY,
	MEAT_OR_VEG,
	DRINK_CATEGORY,
} from '../../../../server/src/constants';
import IngredientList from './IngredientList';
import ImageUpload from './ImageUpload';
import { FoodMenuFormData, MenuFormData } from '../../types/foodItemInterfaces';
import { DrinkMenuFormData } from '../../types/drinkItemInterfaces';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

const AddMenuItem = () => {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [ingredients, setIngredients] = useState<string[]>(['']);
	const [isDrink, setIsDrink] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { state } = useAuth(); // Use useAuth to get the state
	const { token } = state;
	const navigate = useNavigate(); // Use useNavigate to programmatically navigate

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<MenuFormData>({
		defaultValues: {
			menuCategory: '',
			pizzaType: '',
			name: '',
			imageUrl: '',
			ingredients: [''],
			price: 0,
			drinkCategory: '', // Add drinkCategory for drinks
		},
	});

	const watchedMenuCategory = watch('menuCategory', '');
	const watchedIngredients = watch('ingredients', ingredients);

	// Sync ingredients array state with form state
	useEffect(() => {
		setValue('ingredients', ingredients);
	}, [ingredients, setValue]);

	// Watch for changes in the menuCategory to toggle drink options
	useEffect(() => {
		setIsDrink(watchedMenuCategory === MENU_CATEGORY.DRINK.value);
	}, [watchedMenuCategory]);

	// Create a mapping of menu category values to their corresponding labels
	const menuCategoryLabelMap: Record<string, string> = Object.values(
		MENU_CATEGORY
	).reduce((acc, category) => {
		acc[category.value] = category.label;
		return acc;
	}, {} as Record<string, string>);

	const onSubmit: SubmitHandler<MenuFormData> = async (data) => {
		try {
			setIsLoading(true);

			if (!token) {
				setError('You are not authorized to access this page');
				setIsLoading(false);
				return;
			}

			// Define the form data
			const formData = {
				...data,
				ingredients: ingredients.filter(
					(ingredient) => ingredient.trim() !== ''
				),
			};

			// Define the fetch response
			const response = await fetch(
				isDrink
					? `${import.meta.env.VITE_API_BASE_URL}/drinkMenu`
					: `${import.meta.env.VITE_API_BASE_URL}/foodMenu`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				}
			);

			// After the fetch response is successful, reset the form, ingredients array, and navigate to the menu page
			if (response.ok) {
				toast.success('Your menu item was successfully added!');
				const menuItem = await response.json();
				setIngredients(menuItem.ingredients || []);
				reset();
				setImagePreview(null); // Clear the image preview

				// Navigate to the correct menu category page using the label
				if (isDrink) {
					navigate('/drinksmenu');
				} else {
					const menuCategoryLabel =
						menuCategoryLabelMap[data.menuCategory];
					navigate(`/${menuCategoryLabel}`);
				}
			} else {
				const errorData = await response.json();

				toast.error(`Failed to submit menu item: ${errorData.message}`);
				setError(`Failed to submit menu item: ${errorData.message}`);
			}
		} catch (error) {
			toast.error('Error submitting form');
			setError('Error submitting form');
		} finally {
			setIsLoading(false);
		}
	};

	// Handle the image from cloudinary, sets the image value and displays the image preview
	const handleImageUrl = (file: any) => {
		const fileUrl = file.secure_url;

		setImagePreview(fileUrl);
		setValue('imageUrl', fileUrl);
	};

	// Handles the new value in the ingredients array by replacing the default value
	const handleAddIngredient = () => {
		setIngredients((prevIngredients) => [...prevIngredients, '']);
	};

	// Handles the removal of ingredients by filtering the chosen index number out of the array
	const handleRemoveIngredient = (index: number) => {
		setIngredients((prevIngredients) =>
			prevIngredients.filter((_, i) => i !== index)
		);
	};

	// Update the ingredients value based on index position
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

	// Error screen
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
			<section className="flex justify-center items-center w-screen sm:w-full h-full py-28">
				<form
					className="w-11/12 md:w-9/12 lg:w-6/12 2xl:w-4/12 flex flex-col border shadow-md shadow-slate-400 rounded-lg px-6 py-8 mb-10 bg-slate-50"
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
					{(errors as FieldErrorsImpl<FoodMenuFormData>)
						.menuCategory && (
						<p className="text-md text-red-500">
							Menu category is required.
						</p>
					)}

					{/* Drink Category Section */}
					{isDrink && (
						<>
							<label
								htmlFor="drinkCategory"
								className="font-handlee-regular text-lg p-2 font-semibold"
							>
								Drink Category
							</label>
							<select
								{...register('drinkCategory', {
									required: true,
								})}
								className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
							>
								<option value="" disabled>
									-- Select --
								</option>
								{Object.values(DRINK_CATEGORY).map(
									(category, index) => (
										<option
											key={index}
											value={category.value}
										>
											{category.label}
										</option>
									)
								)}
							</select>
							{/* Error message for drink category */}
							{(errors as FieldErrorsImpl<DrinkMenuFormData>)
								.drinkCategory && (
								<p className="text-md text-red-500">
									Drink category is required.
								</p>
							)}
						</>
					)}

					{/* Meat or Veg Section for Food Items */}
					{!isDrink && (
						<>
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
								{Object.values(MEAT_OR_VEG).map(
									(category, index) => (
										<option
											key={index}
											value={category.value}
										>
											{category.label}
										</option>
									)
								)}
							</select>
						</>
					)}

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

					{/* Image Upload and Ingredient List Section for Food Items */}
					{!isDrink && (
						<>
							<ImageUpload
								imagePreview={imagePreview}
								setImageUrl={handleImageUrl}
							/>

							<IngredientList
								ingredients={watchedIngredients}
								onAddIngredient={handleAddIngredient}
								onRemoveIngredient={handleRemoveIngredient}
								onIngredientChange={handleIngredientChange}
							/>
						</>
					)}

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

export default AddMenuItem;
