import { FC } from 'react';
import { IngredientListProps } from '../../types/newFoodItemInterfaces';

const IngredientList: FC<IngredientListProps> = ({
	ingredients,
	onAddIngredient,
	onRemoveIngredient,
	onIngredientChange,
}) => {
	return (
		<div>
			<label
				htmlFor="ingredients"
				className="font-handlee-regular text-lg p-2 font-semibold"
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
					>
						Remove
					</button>
				</div>
			))}
			<button
				type="button"
				onClick={onAddIngredient}
				className="mb-3 p-2 bg-green-500 text-white rounded-md"
			>
				Add Ingredient
			</button>
		</div>
	);
};

export default IngredientList;
