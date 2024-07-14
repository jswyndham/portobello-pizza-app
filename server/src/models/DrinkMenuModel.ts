import mongoose, { Document, Schema } from 'mongoose';
import { DRINK_CATEGORY, DrinkCategory } from '../constants';

interface DrinkMenu extends Document {
	drinkCategory: DrinkCategory['value'];
	name: string;
	imageUrl?: string; // Optional field for image URL
	ingredients: string[];
	price: number;
	size: string;
}

const DrinkMenuSchema: Schema = new Schema({
	drinkCategory: {
		type: String,
		enum: Object.values(DRINK_CATEGORY).map((type) => type.value),
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

// Add custom validation middleware in a pre-save hook
// Only require ingredients if drinkCategory is 'COCKTAIL'
// DrinkMenuSchema.pre('save', function (next) {
// 	if (
// 		this.drinkCategory === DRINK_CATEGORY.COCKTAIL.value &&
// 		(!Array.isArray(this.ingredients) || this.ingredients.length === 0)
// 	) {
// 		return next(new Error('Ingredients are required for cocktails.'));
// 	}
// 	next();
// });

export default mongoose.model<DrinkMenu>('DrinkMenu', DrinkMenuSchema);
