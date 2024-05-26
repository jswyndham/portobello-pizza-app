// User status assigned when users signup
export const USER_STATUS = {
	ADMIN: { value: 'ADMIN', label: 'admin' },
	MANAGER: { value: 'MANAGER', label: 'manager' },
	STAFF_MEMBER: { value: 'STAFF_MEMBER', label: 'staff member' },
} as const;

// Member status for admin group members
export const ADMIN_STATUS = {
	SITE_MANAGER: {
		value: 'SITE_MANAGER',
		label: 'site manager',
	},
	USER_MODERATOR: {
		value: 'USER_MODERATOR',
		label: 'user moderator',
	},
	CONTENT_OVERSEER: {
		value: 'CONTENT_OVERSEER',
		label: 'content overseer',
	},
	SUPER_ADMIN: {
		value: 'SUPER_ADMIN',
		label: 'super admin',
	},
} as const;

// Menu category
export const MENU_CATEGORY = {
	PIZZA: {
		value: 'PIZZA',
		label: 'pizza',
	},
	PASTA: {
		value: 'PASTA',
		label: 'pasta',
	},
	CALZONE: {
		value: 'CALZONE',
		label: 'calzone',
	},
	STARTERS: {
		value: 'STARTER',
		label: 'starter',
	},
	MAINS: {
		value: 'MAIN',
		label: 'main',
	},
	SIDES: {
		value: 'SIDE',
		label: 'side',
	},
	SALAD: {
		value: 'SALAD',
		label: 'salad',
	},
	DESSERT: {
		value: 'DESSERT',
		label: 'dessert',
	},
	DRINK: {
		value: 'DRINK',
		label: 'drink',
	},
} as const;

// Drink category
export const DRINK_CATEGORY = {
	BEER: {
		value: 'BEER',
		label: 'beer',
	},
	WINE: {
		value: 'WINE',
		label: 'wine',
	},
	COCKTAIL: {
		value: 'COCKTAIL',
		label: 'cocktail',
	},
	JUICE_SODA: {
		value: 'JUICE_SODA',
		label: 'juice & soda',
	},
	COFFEE_TEA: {
		value: 'COFFEE_TEA',
		label: 'coffee & tea',
	},
} as const;

// Vegetarian or meat-eater
export const MEAT_OR_VEG = {
	VEGETARIAN: {
		value: 'VEGETARIAN',
		label: 'vegetarian list',
	},
	MEAT: {
		value: 'MEAT',
		label: 'meat-eaters list',
	},
} as const;

type ValueOf<T> = T[keyof T];
export type UserStatus = ValueOf<typeof USER_STATUS>;
export type AdminStatus = ValueOf<typeof ADMIN_STATUS>;
export type MenuCategory = ValueOf<typeof MENU_CATEGORY>;
export type DrinkCategory = ValueOf<typeof DRINK_CATEGORY>;
export type MeatOrVeg = ValueOf<typeof MEAT_OR_VEG>;
