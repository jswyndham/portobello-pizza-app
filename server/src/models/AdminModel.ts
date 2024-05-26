import mongoose, { Document, Schema } from 'mongoose';
import { ADMIN_STATUS, AdminStatus } from '../utils/constants';
import { User } from './UserModel';

interface Admin extends Document {
	user: User['_id'];
	adminRole: AdminStatus['value'][];
}

const AdminSchema: Schema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		adminRole: [
			{
				type: String,
				enum: Object.values(ADMIN_STATUS).map((type) => type.value),
				required: true,
			},
		],
	},
	{ timestamps: true }
);

const AdminModel = mongoose.model<Admin>('Admin', AdminSchema);
export default AdminModel;
