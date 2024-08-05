import { ROLE_PERMISSIONS, Role } from '../constants';

const hasPermission = (userRole: Role, action: string): boolean => {
	const permissions = ROLE_PERMISSIONS[userRole] as readonly string[];
	return permissions.includes(action);
};

export default hasPermission;
