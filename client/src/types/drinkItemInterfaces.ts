export interface DrinkMenuItem {
	_id: string;
	drinkCategory: string;
	name: string;
	imageUrl?: string;
	ingredients: string[];
	price: number;
}

export interface DrinkMenuFormData {
	drinkCategory: string;
	name: string;
	ingredients: string[];
	price: number;
}
