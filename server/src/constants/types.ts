import { ADMIN_STATUS } from './adminStatus';
import { DRINK_CATEGORY } from './drinkCategory';
import { MEAT_OR_VEG } from './meatOrVeg';
import { MENU_CATEGORY } from './menuCategory';
import { ROLE_PERMISSIONS } from './rolePermissions';
import { USER_STATUS } from './userStatus';

type ValueOf<T> = T[keyof T];
export type UserStatus = ValueOf<typeof USER_STATUS>;
export type AdminStatus = ValueOf<typeof ADMIN_STATUS>;
export type MenuCategory = ValueOf<typeof MENU_CATEGORY>;
export type DrinkCategory = ValueOf<typeof DRINK_CATEGORY>;
export type MeatOrVeg = ValueOf<typeof MEAT_OR_VEG>;
export type rolePermissions = ValueOf<typeof ROLE_PERMISSIONS>;
