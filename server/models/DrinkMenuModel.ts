import mongoose, { Document, Schema } from 'mongoose';
import { DRINK_CATEGORY, DrinkCategory } from '../utils/constants';

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
	imageUrl: {
		type: String,
		required: false, // Make this field optional
	},
	ingredients: [
		{
			type: String,
			validate: {
				validator: function (value: string[]) {
					// Only require ingredients if drinkCategory is 'COCKTAIL'
					return (
						this.drinkCategory !== DRINK_CATEGORY.COCKTAIL.value ||
						(Array.isArray(value) && value.length > 0)
					);
				},
				message: 'Ingredients are required for cocktails.',
			},
		},
	],
	price: {
		type: Number,
		required: true,
	},
});

export default mongoose.model<DrinkMenu>('DrinkMenu', DrinkMenuSchema);
