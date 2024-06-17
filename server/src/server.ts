import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import foodMenuRoutes from './routes/foodMenuRoutes';
import drinkMenuRoutes from './routes/drinkMenuRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// ROUTER
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/foodMenu', foodMenuRoutes);
app.use('/api/v1/drinkMenu', drinkMenuRoutes);

app.get('/', (req: Request, res: Response) => {
	res.send('Hello from Express!');
});

const startServer = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL!);
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

if (process.env.NODE_ENV !== 'test') {
	startServer();
}

export default app;
