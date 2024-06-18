import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FoodMenuFormProps {
	initialData: {
		menuCategory?: string[];
		pizzaType?: string;
		name?: string;
		imageUrl?: string;
		ingredients?: string[];
		price?: number;
	};
}

const AddMenuItem = ({ initialData }: FoodMenuFormProps) => {
	const [foodMenuItem, setFoodMenuItem] = useState({
		menuCategory: initialData.menuCategory || '',
		pizzaType: initialData.pizzaType || '',
		name: initialData.name || '',
		imageUrl: initialData.imageUrl || '',
		ingredients: initialData.ingredients || [''],
		price: initialData.price || 0,
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm();

	useEffect(() => {
		console.log(foodMenuItem); // Log the updated state
	}, [foodMenuItem]);

	const onSubmit = async (data: any) => {
		try {
			const response = await fetch('/api/foodMenu', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				console.log('Menu item created:', await response.json());
				reset();
			} else {
				console.error('Failed to create menu item');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
		<section className="flex justify-center items-center w-screen sm:w-full h-fit">
			<form
				className="flex flex-col border shadow-md shadow-slate-400 rounded-lg px-6 py-8 mb-10 bg-slate-50"
				onSubmit={handleSubmit(onSubmit)}
			>
				<label htmlFor="menuCategory">Menu Category</label>
				<input
					{...register('menuCategory', { required: true })}
					placeholder="Enter menu category..."
					className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
				/>
				{errors.menuCategory && (
					<p className="text-md text-red-500">
						Menu category is required.
					</p>
				)}

				<label htmlFor="pizzaType">Pizza Type</label>
				<input
					{...register('pizzaType')}
					placeholder="Enter pizza type..."
					className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
				/>

				<label htmlFor="name">Name</label>
				<input
					{...register('name', { required: true })}
					placeholder="Enter name..."
					className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
				/>
				{errors.name && (
					<p className="text-md text-red-500">Name is required.</p>
				)}

				<label htmlFor="imageUrl">Image URL</label>
				<input
					{...register('imageUrl')}
					placeholder="Enter image URL..."
					className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
				/>

				<label htmlFor="ingredients">Ingredients</label>
				<input
					{...register('ingredients', { required: true })}
					placeholder="Enter ingredients..."
					className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
				/>
				{errors.ingredients && (
					<p className="text-md text-red-500">
						Ingredients are required.
					</p>
				)}

				<label htmlFor="price">Price</label>
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
