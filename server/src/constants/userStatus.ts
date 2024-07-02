export enum USER_STATUS {
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
}

// Defining a constant object for user status labels
export const USER_STATUS_LABELS = {
	[USER_STATUS.ADMIN]: 'admin',
	[USER_STATUS.MANAGER]: 'manager',
} as const;

// Defining the UserStatus type as the keys of the USER_STATUS enum
export type UserStatus = keyof typeof USER_STATUS;
