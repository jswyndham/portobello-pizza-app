export interface AuditLog {
	_id: string;
	createdAt: string;
	action: string;
	subjectType: string;
	subjectId: string;
	userId: string;
	details: string;
	menuType?: string;
}

export interface AuditLogProps {
	_id: string;
	createdAt: string;
	action: string;
	subjectType: string;
	details: string;
}
