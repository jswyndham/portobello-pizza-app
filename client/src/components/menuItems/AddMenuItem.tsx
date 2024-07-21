import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldErrorsImpl } from 'react-hook-form';
import {
	MENU_CATEGORY,
	MEAT_OR_VEG,
	DRINK_CATEGORY,
} from '../../../../server/src/constants';
import IngredientList from './IngredientList';
import ImageUpload from './ImageUpload';
import {
	FoodMenuFormData,
	DrinkMenuFormData,
	MenuFormData,
} from '../../types/foodItemInterfaces';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddMenuItem = () => {
	const { state } = useAuth();
	const navigate = useNavigate();
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [ingredients, setIngredients] = useState<string[]>(['']);
	const [isDrink, setIsDrink] = useState(false);

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

	// Sync ingredients state with form state
	useEffect(() => {
		setValue('ingredients', ingredients);
	}, [ingredients, setValue]);

	// Watch for changes in the menuCategory to toggle drink options
	useEffect(() => {
		setIsDrink(watchedMenuCategory === MENU_CATEGORY.DRINK.value);
	}, [watchedMenuCategory]);

	const onSubmit: SubmitHandler<MenuFormData> = async (data) => {
		try {
			const formData = {
				...data,
				ingredients: ingredients.filter(
					(ingredient) => ingredient.trim() !== ''
				),
			};

			console.log('Submitting form with data:', formData);

			const response = await fetch(
				isDrink
					? 'http://localhost:5001/api/v1/drinkMenu'
					: 'http://localhost:5001/api/v1/foodMenu',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${state.token}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				const menuItem = await response.json();
				setIngredients(menuItem.ingredients || []);
				reset();
				navigate(isDrink ? '/drinksmenu' : '/foodmenu');
			} else {
				const errorData = await response.json();
				console.error('Failed to submit menu item:', errorData.message);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	const handleImageUrl = (file: any) => {
		const fileUrl = file.secure_url;
		console.log('Cloudinary URL:', fileUrl);
		setImagePreview(fileUrl);
		setValue('imageUrl', fileUrl);
	};

	const handleAddIngredient = () => {
		setIngredients((prevIngredients) => [...prevIngredients, '']);
	};

	const handleRemoveIngredient = (index: number) => {
		setIngredients((prevIngredients) =>
			prevIngredients.filter((_, i) => i !== index)
		);
	};

	const handleIngredientChange = (index: number, value: string) => {
		setIngredients((prevIngredients) =>
			prevIngredients.map((ingredient, i) =>
				i === index ? value : ingredient
			)
		);
	};

	return (
		<section className="flex justify-center items-center w-screen sm:w-full h-full py-28">
			<form
				className="w-11/12 md:w-9/12 lg:w-6/12 2xl:w-4/12 z-10 flex flex-col border shadow-md shadow-slate-400 rounded-lg px-6 py-8 mb-10 bg-slate-50"
				onSubmit={handleSubmit(onSubmit)}
			>
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
				{(errors as FieldErrorsImpl<FoodMenuFormData>).menuCategory && (
					<p className="text-md text-red-500">
						Menu category is required.
					</p>
				)}

				{isDrink && (
					<>
						<label
							htmlFor="drinkCategory"
							className="font-handlee-regular text-lg p-2 font-semibold"
						>
							Drink Category
						</label>
						<select
							{...register('drinkCategory', { required: true })}
							className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
						>
							<option value="" disabled>
								-- Select --
							</option>
							{Object.values(DRINK_CATEGORY).map(
								(category, index) => (
									<option key={index} value={category.value}>
										{category.label}
									</option>
								)
							)}
						</select>
						{(errors as FieldErrorsImpl<DrinkMenuFormData>)
							.drinkCategory && (
							<p className="text-md text-red-500">
								Drink category is required.
							</p>
						)}
					</>
				)}

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
									<option key={index} value={category.value}>
										{category.label}
									</option>
								)
							)}
						</select>
					</>
				)}

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
				{errors.name && (
					<p className="text-md text-red-500">Name is required.</p>
				)}

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
				{errors.price && (
					<p className="text-md text-red-500">Price is required.</p>
				)}

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
	);
};

export default AddMenuItem;
