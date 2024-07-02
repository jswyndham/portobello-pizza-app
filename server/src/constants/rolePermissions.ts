export const USER_STATUS = {
	ADMIN: { value: 'ADMIN', label: 'admin' },
	MANAGER: { value: 'MANAGER', label: 'manager' },
} as const;

export type UserStatus = keyof typeof USER_STATUS;

export const ROLE_PERMISSIONS = {
	ADMIN: [
		'EDIT_FOOD_ITEM',
		'DELETE_FOOD_ITEM',
		'DELETE_USER',
		'EDIT_USER',
		'EDIT_DRINK_ITEM',
		'DELETE_DRINK_ITEM',
	] as const,
	MANAGER: ['EDIT_FOOD_ITEM'] as const,
} as const;

export type Role = keyof typeof ROLE_PERMISSIONS;
export type Permission = (typeof ROLE_PERMISSIONS)[Role][number];
