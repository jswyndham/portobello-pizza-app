import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import './jobs/clearOldAuditLogs';
import {
	auditLogRoutes,
	authRoutes,
	drinkMenuRoutes,
	foodMenuRoutes,
	userRoutes,
} from './routes';
import logger from './logger';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Configure CORS
app.use(
	cors({
		origin: 'http://localhost:5173', // Allow requests from this origin
		credentials: true, // Allow credentials to be sent with requests
		optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
	})
);

// ROUTER
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auditlogs', auditLogRoutes);
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
		logger.error('Error starting server:', error);
		process.exit(1);
	}
};

if (process.env.NODE_ENV !== 'test') {
	startServer();
}

export default app;
