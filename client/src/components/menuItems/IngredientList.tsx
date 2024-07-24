import { FC, useEffect } from 'react';
import { IngredientListProps } from '../../types/foodItemInterfaces';
import { FaTrashAlt } from 'react-icons/fa';
import { IoAddOutline } from 'react-icons/io5';

const IngredientList: FC<IngredientListProps> = ({
	ingredients = [],
	onAddIngredient,
	onRemoveIngredient,
	onIngredientChange,
}) => {
	useEffect(() => {}, [ingredients]);

	return (
		<div className="flex flex-col">
			<label
				htmlFor="ingredients"
				className="font-noto-serif-display text-lg p-2 font-semibold"
			>
				Ingredients
			</label>

			{ingredients.map((ingredient, index) => (
				<div key={index} className="flex items-center mb-3">
					<input
						type="text"
						value={ingredient}
						onChange={(e) =>
							onIngredientChange(index, e.target.value)
						}
						className="p-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300 flex-grow"
						placeholder="Enter ingredient..."
					/>
					<button
						type="button"
						onClick={() => onRemoveIngredient(index)}
						className="ml-2 p-2 bg-red-500 text-white rounded-md"
						aria-label={`Remove ingredient ${index + 1}`}
					>
						<FaTrashAlt />
					</button>
				</div>
			))}
			<button
				type="button"
				onClick={onAddIngredient}
				className="w-fit mb-3 p-2 ml-2 bg-green-600 text-white rounded-md"
				aria-label={`Add ingredient`}
			>
				<IoAddOutline className="text-3xl font-bold" />
			</button>
		</div>
	);
};

export default IngredientList;
