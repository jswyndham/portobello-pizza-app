export interface AuditLog {
	_id: string;
	createdAt: string;
	subjectType: string;
	subjectId: string;
	userId: string;
	details: Record<string, any>;
	menuType?: string;
}

export interface AuditLogProps {
	_id: string;
	createdAt: string;
	subjectType: string;
	details: Record<string, any>;
}
