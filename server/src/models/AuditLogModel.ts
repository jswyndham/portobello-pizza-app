import mongoose, { Document, Schema } from 'mongoose';

export interface AuditLog extends Document {
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
		subjectId: { type: mongoose.Types.ObjectId, required: true },
		userId: { type: mongoose.Types.ObjectId, required: true },
		details: { type: Map, of: String, required: true },
		menuType: { type: String }, // Make menuType optional
	},
	{ timestamps: true }
);

const AuditLogModel = mongoose.model<AuditLog>('AuditLog', AuditLogSchema);
export default AuditLogModel;
