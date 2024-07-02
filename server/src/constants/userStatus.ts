export enum USER_STATUS {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
}

export const USER_STATUS_LABELS = {
  [USER_STATUS.ADMIN]: "admin",
  [USER_STATUS.MANAGER]: "manager",
} as const;

export type UserStatus = USER_STATUS;

export const ROLE_PERMISSIONS = {
  [USER_STATUS.ADMIN]: [
    "EDIT_FOOD_ITEM",
    "DELETE_FOOD_ITEM",
    "DELETE_USER",
    "EDIT_USER",
    "EDIT_DRINK_ITEM",
    "DELETE_DRINK_ITEM",
  ] as const,
  [USER_STATUS.MANAGER]: ["EDIT_FOOD_ITEM"] as const,
} as const;

export type Role = USER_STATUS;
export type Permission = (typeof ROLE_PERMISSIONS)[Role][number];
