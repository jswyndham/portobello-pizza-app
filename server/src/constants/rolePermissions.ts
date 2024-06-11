export const ROLE_PERMISSIONS = {
	ADMIN: [
		'EDIT_FOOD_ITEM',
		'DELETE_FOOD_ITEM',
		'DELETE_USER',
		'EDIT_USER',
	] as const,
	MANAGER: ['EDIT_FOOD_ITEM'] as const,
} as const;

export type Role = keyof typeof ROLE_PERMISSIONS;
export type Permission = (typeof ROLE_PERMISSIONS)[Role][number];
