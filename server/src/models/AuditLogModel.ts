import mongoose, { Document, Schema } from 'mongoose';

export interface AuditLog extends Document {
	_id: mongoose.Types.ObjectId;
	createdAt: Date;
	action: string;
	subjectType: string;
	subjectId: mongoose.Types.ObjectId;
	userId: mongoose.Types.ObjectId;
	details: Record<string, any>;
	menuType?: string; // Make menuType optional
}

const AuditLogSchema: Schema = new Schema(
	{
		action: { type: String, required: true },
		subjectType: { type: String, required: true },
		subjectId: {
			type: mongoose.Types.ObjectId,
			required: true,
			refPath: 'subjectType',
		},
		userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
		details: { type: Schema.Types.Mixed, required: true }, // Allow any type for details
		menuType: { type: String }, // Make menuType optional
	},
	{ timestamps: true }
);

const AuditLogModel = mongoose.model<AuditLog>('AuditLog', AuditLogSchema);
export default AuditLogModel;
