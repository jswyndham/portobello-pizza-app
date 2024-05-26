import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

// ROUTER
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
	res.send('Hello from Express!');
});

const startServer = async () => {
	try {
		// await mongoose.connect(process.env.MONGO_URL!);
		app.listen(PORT, () => {
			console.log(
				`Server running on PORT ${PORT}... Connected to MongoDB`
			);
		});
	} catch (error) {
		console.error('Error starting server:', error);
		process.exit(1);
	}
};

startServer();
