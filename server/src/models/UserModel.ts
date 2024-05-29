import mongoose, { Document, Types, Schema } from 'mongoose';
import { USER_STATUS, UserStatus } from '../utils/constants';

export interface User extends Document {
	_id: Types.ObjectId;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	userStatus: UserStatus['value'];
	lastLogin?: Date;
}

const UserSchema: Schema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		userStatus: {
			type: String,
			enum: Object.values(USER_STATUS).map((type) => type.value),
			required: true,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

// Don't show password for user
UserSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.password;
	return obj;
};

const UserModel = mongoose.model<User>('User', UserSchema);
export default UserModel;
