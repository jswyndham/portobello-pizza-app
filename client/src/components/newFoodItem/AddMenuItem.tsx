import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MENU_CATEGORY, MEAT_OR_VEG } from '../../../../server/src/constants';
import IngredientList from './IngredientList';
import ImageUpload from './ImageUpload';
import {
	FoodMenuFormData,
	FoodMenuFormProps,
} from '../../types/newFoodItemInterfaces';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const AddMenuItem = ({ initialData }: FoodMenuFormProps) => {
	const { id } = useParams<{ id: string }>();
	const { state } = useAuth();
	const navigate = useNavigate();
	const [imagePreview, setImagePreview] = useState<string | null>(
		initialData?.imageUrl || null
	);

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<FoodMenuFormData>({
		defaultValues: {
			menuCategory: initialData?.menuCategory || '',
			pizzaType: initialData?.pizzaType || '',
			name: initialData?.name || '',
			imageUrl: initialData?.imageUrl || '',
			ingredients: initialData?.ingredients || [''],
			price: initialData?.price || 0,
		},
	});

	// Fetch the food item data if id is provided
	useEffect(() => {
		const fetchFoodMenuItem = async () => {
			if (id) {
				const response = await fetch(
					`http://localhost:5001/api/v1/foodMenu/${id}`
				);
				const data = await response.json();
				setValue('menuCategory', data.menuCategory || '');
				setValue('pizzaType', data.pizzaType || '');
				setValue('name', data.name || '');
				setValue('imageUrl', data.imageUrl || '');
				setValue('ingredients', data.ingredients || []);
				setValue('price', data.price || 0);
				setImagePreview(data.imageUrl || null);
			}
		};

		fetchFoodMenuItem();
	}, [id, setValue]);

	const onSubmit: SubmitHandler<FoodMenuFormData> = async (data) => {
		try {
			const formData = {
				menuCategory: data.menuCategory,
				pizzaType: data.pizzaType || '',
				name: data.name,
				ingredients: data.ingredients,
				price: data.price,
				imageUrl: data.imageUrl,
			};

			console.log('Submitting form with data:', formData); // Debugging output

			const method = id ? 'PATCH' : 'POST';
			const url = id
				? `http://localhost:5001/api/v1/foodMenu/${id}`
				: 'http://localhost:5001/api/v1/foodMenu';

			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${state.token}`,
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				reset();
				navigate('/foodmenu');
			} else {
				const errorData = await response.json();
				console.error('Failed to submit menu item:', errorData.message);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	// Handler for cloudinary image
	const handleImageUrl = (file: any) => {
		const fileUrl = file.secure_url;
		console.log('Cloudinary URL:', fileUrl); // Debugging output
		setImagePreview(fileUrl);
		setValue('imageUrl', fileUrl);
	};

	// Handlers for ingredients array
	const handleAddIngredient = () => {
		const ingredients = getValues('ingredients') || [];
		setValue('ingredients', [...ingredients, '']);
	};

	const handleRemoveIngredient = (index: number) => {
		const ingredients = getValues('ingredients') || [];
		ingredients.splice(index, 1);
		setValue('ingredients', ingredients);
	};

	const handleIngredientChange = (index: number, value: string) => {
		const ingredients = getValues('ingredients') || [];
		ingredients[index] = value;
		setValue('ingredients', ingredients);
	};

	return (
		<section className="flex justify-center items-center w-screen sm:w-full h-fit">
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
				{errors.menuCategory && (
					<p className="text-md text-red-500">
						Menu category is required.
					</p>
				)}

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

				<ImageUpload
					imagePreview={imagePreview}
					setImageUrl={handleImageUrl}
				/>

				<IngredientList
					ingredients={getValues('ingredients') || []}
					onAddIngredient={handleAddIngredient}
					onRemoveIngredient={handleRemoveIngredient}
					onIngredientChange={handleIngredientChange}
				/>

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
