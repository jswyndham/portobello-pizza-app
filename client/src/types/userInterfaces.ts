export interface userData {
	_id: string;
	firstName: string;
	lastName: string;
	userStatus: string;
	lastLogin?: Date;
}

export interface useDataProps {
	firstName: string;
	lastName: string;
	userStatus: string;
	lastLogin: string;
}
