export interface FoodMenuFormProps {
	_id?: string;
	menuCategory?: string;
	pizzaType?: string;
	name?: string;
	imageUrl?: string;
	ingredients?: string[];
	price?: number;
}

export interface FoodMenuFormData {
	menuCategory: string;
	pizzaType: string;
	name: string;
	imageUrl: string;
	ingredients: string[];
	price: number;
}

export interface FoodMenuItem {
	_id: string;
	menuCategory: string;
	pizzaType?: string;
	name: string;
	imageUrl?: string;
	ingredients: string[];
	price: number;
}

export interface MenuFormData {
	menuCategory: string;
	pizzaType: string;
	name: string;
	imageUrl: string;
	ingredients: string[];
	price: number;
	drinkCategory: string;
}

export interface IngredientListProps {
	ingredients: string[];
	onAddIngredient: () => void;
	onRemoveIngredient: (index: number) => void;
	onIngredientChange: (index: number, value: string) => void;
}

export interface ImageUploadProps {
	imagePreview: string | null;
	setImageUrl: (url: string) => void;
}

export interface AddMenuItemProps {
	onAddItem: () => void;
}
