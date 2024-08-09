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
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

// *** MIDDLEWARE ***
app.use(express.json()); // Parse JSON bodies

app.use(cookieParser()); // Parse cookies

app.use(helmet()); // Set security headers

app.use(compression()); // Enable gzip compression for responses

// Configure CORS
const allowedOrigins =
	process.env.NODE_ENV === 'production'
		? ['https://portobello-pizza-app.vercel.app']
		: ['http://localhost:3000'];

// Configure CORS
app.use(
	cors({
		origin: function (origin, callback) {
			// Allow requests with no origin (like mobile apps or curl requests)
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
		credentials: true, // Allow credentials to be sent with requests
		optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
	})
);

// Moderate rate limiting configuration
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 200, // limit each IP to 200 requests per windowMs
	message:
		'Too many requests from this IP, please try again after 15 minutes',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter); // Apply rate limiting globally....

// *** ROUTER ***
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
