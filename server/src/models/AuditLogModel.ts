import mongoose, { Document, Schema } from 'mongoose';
import { User } from './UserModel';

interface AuditLog extends Document {
	action: string;
	menuType: string;
	userId: User['_id']; // Reference to User type
	details: object;
	timestamp?: Date;
}

const AuditLogSchema: Schema = new Schema({
	action: { type: String, required: true }, // e.g., "CREATE", "UPDATE", "DELETE"
	menuType: { type: String, required: true }, // e.g., "Pizza", "Drink"
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	}, // Reference to the user who performed the action
	details: { type: Object, required: true }, // Provide details about the action
	timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<AuditLog>('AuditLog', AuditLogSchema);
