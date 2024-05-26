import mongoose, { Document, Schema } from 'mongoose';
import {
	MEAT_OR_VEG,
	MENU_CATEGORY,
	MenuCategory,
	MeatOrVeg,
} from '../utils/constants';

interface FoodMenu extends Document {
	menuCategory: MenuCategory['value'];
	pizzaType?: MeatOrVeg['value'];
	name: string;
	ingredients: string[];
	price: number;
}

const FoodMenuSchema: Schema = new Schema({
	menuCategory: {
		type: String,
		enum: Object.values(MENU_CATEGORY)
			.filter((type) => type.value !== 'DRINK') // Exclude DRINK for food items
			.map((type) => type.value),
		required: true,
	},
	pizzaType: {
		type: String,
		enum: Object.values(MEAT_OR_VEG).map((type) => type.value),
		validate: {
			validator: function (value: string[]) {
				// Only require ingredients if foodCategory is 'PIZZA'
				return (
					this.foodCategory !== MENU_CATEGORY.PIZZA.value ||
					(Array.isArray(value) && value.length > 0)
				);
			},
			message:
				'For pizza items, you need to choose either "vegetarian list" or "meat-eater list".',
		},
	},
	name: {
		type: String,
		required: true,
	},
	ingredients: [
		{
			type: String,
			required: true,
		},
	],
	price: {
		type: Number,
		required: true,
	},
});

export default mongoose.model<FoodMenu>('FoodMenu', FoodMenuSchema);
