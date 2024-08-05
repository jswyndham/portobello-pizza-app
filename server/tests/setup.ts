// tests/setup.ts
import mongoose from 'mongoose';

const connectToDatabase = async () => {
	const url = `mongodb://127.0.0.1:27017/test_database_${new Date().getTime()}`;
	const options = {
		serverSelectionTimeoutMS: 40000,
		connectTimeoutMS: 40000,
	};

	await mongoose.connect(url, options);
};

const disconnectFromDatabase = async () => {
	await mongoose.connection.db.dropDatabase();
	await mongoose.disconnect();
};

export { connectToDatabase, disconnectFromDatabase };
