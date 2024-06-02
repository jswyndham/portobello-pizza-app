export const ROLE_PERMISSIONS = {
	ADMIN: ['DELETE_FOOD_ITEM'] as const,
	MANAGER: ['DELETE_FOOD_ITEM'] as const,
	STAFF_MEMBER: ['DELETE_FOOD_ITEM'] as const,
} as const;

export type Role = keyof typeof ROLE_PERMISSIONS;
export type Permission = (typeof ROLE_PERMISSIONS)[Role][number];
