import mongoose, { Document, Types, Schema } from 'mongoose';
import { MENU_CATEGORY, MenuCategory, MeatOrVeg } from '../constants';

export interface FoodMenu extends Document {
	_id: Types.ObjectId;
	menuCategory: MenuCategory['value'];
	pizzaType?: MeatOrVeg['value'];
	name: string;
	imageUrl?: string; // Optional field for image URL
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
		required: false, // Make this field optional
	},
	name: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: false,
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

// Add custom validation middleware in a pre-save hook
// Only require ingredients if foodCategory is 'PIZZA'
FoodMenuSchema.pre('save', function (next: (err?: Error | undefined) => void) {
	const foodMenu = this as any as FoodMenu; // Explicitly cast `this` to `any` first, then to `FoodMenu`
	if (
		foodMenu.menuCategory !== MENU_CATEGORY.PIZZA.value &&
		(!Array.isArray(foodMenu.ingredients) ||
			foodMenu.ingredients.length === 0)
	) {
		return next(new Error('Ingredients are required for cocktails.'));
	}
	next();
});

export default mongoose.model<FoodMenu>('FoodMenu', FoodMenuSchema);
