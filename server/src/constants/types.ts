import { DRINK_CATEGORY } from './drinkCategory';
import { MEAT_OR_VEG } from './meatOrVeg';
import { MENU_CATEGORY } from './menuCategory';

type ValueOf<T> = T[keyof T];

export type MenuCategory = ValueOf<typeof MENU_CATEGORY>;
export type DrinkCategory = ValueOf<typeof DRINK_CATEGORY>;
export type MeatOrVeg = ValueOf<typeof MEAT_OR_VEG>;

// Define the parameters type for CloudinaryStorage
export interface CloudinaryStorageParams {
	folder: string;
	format: string | undefined;
	public_id: string;
}
