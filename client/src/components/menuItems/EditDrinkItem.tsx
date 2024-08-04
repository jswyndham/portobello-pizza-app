import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DRINK_CATEGORY } from '../../../../server/src/constants';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading';
import { useCache } from '../../context/cacheContext';
import { DrinkMenuFormData } from '../../types/drinkItemInterfaces';
import ErrorMessage from '../ErrorMessage';

const EditDrinkItem = () => {
	const { id } = useParams<{ id: string }>();
	const { state } = useAuth();
	const navigate = useNavigate();
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const { cache, setCache } = useCache();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<DrinkMenuFormData>({
		defaultValues: {
			drinkCategory: '',
			name: '',
			ingredients: [],
			price: 0,
		},
	});

	// ********* useEffect hooks *************

	// Fetch the drink item object and set cache in the browser
	useEffect(() => {
		const fetchDrinkMenuItem = async () => {
			if (id) {
				const cacheKey = `drinkMenuItem-${id}`;
				if (cache[cacheKey]) {
					const item = cache[cacheKey];
					reset({
						drinkCategory: item.drinkCategory || '',
						name: item.name || '',
						ingredients: item.ingredients || [],
						price: item.price || 0,
					});
					setIngredients(item.ingredients || []);
					setIsLoading(false);
				} else {
					try {
						// Retrieve the token from local storage
						const token = localStorage.getItem('authToken');
						if (!token) {
							setError(
								'You are not authorized to access this page'
							);
							setIsLoading(false);
							return;
						}
						setIsLoading(true);
						const response = await fetch(
							`http://localhost:5001/api/v1/drinkMenu/${id}`
						);
						const data = await response.json();
						if (data.drinkMenuItem) {
							const item = data.drinkMenuItem;
							reset({
								drinkCategory: item.drinkCategory || '',
								name: item.name || '',
								ingredients: item.ingredients || [],
								price: item.price || 0,
							});
							setIngredients(item.ingredients || []);
							setCache(cacheKey, item); // Cache the fetched item
						} else {
							console.error('Drink menu item not found:', data);
						}
					} catch (error) {
						console.error('Error fetching drink menu item:', error);
					} finally {
						setIsLoading(false);
					}
				}
			}
		};

		fetchDrinkMenuItem();
	}, [id, reset, cache, setCache]);

	// ************ submit handler ************

	// Submit new values for the existing drink menu item
	const onSubmit: SubmitHandler<DrinkMenuFormData> = async (data) => {
		try {
			const formData = {
				...data,
				ingredients: ingredients.filter(
					(ingredient) => ingredient.trim() !== ''
				),
			};

			const response = await fetch(
				`http://localhost:5001/api/v1/drinkMenu/${id}`,
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
				reset();
				navigate('/drinksmenu');
			} else {
				const errorData = await response.json();
				console.error('Failed to submit menu item:', errorData.message);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	// Loading screen
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
		<section className="flex justify-center items-center w-screen sm:w-full h-fit pt-24 md:pt-52">
			<form
				className="w-11/12 md:w-9/12 lg:w-6/12 2xl:w-4/12 z-10 flex flex-col border shadow-md shadow-slate-400 rounded-lg px-6 py-8 mb-10 bg-slate-50"
				onSubmit={handleSubmit(onSubmit)}
			>
				{/* Drink Category Label and Select Dropdown */}
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
					{Object.values(DRINK_CATEGORY).map((category, index) => (
						<option key={index} value={category.value}>
							{category.label}
						</option>
					))}
				</select>
				{/* Error message for drink category */}
				{errors.drinkCategory && (
					<p className="text-md text-red-500">
						Drink category is required.
					</p>
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
					<p className="text-md text-red-500">Name is required.</p>
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
					<p className="text-md text-red-500">Price is required.</p>
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
	);
};

export default EditDrinkItem;
