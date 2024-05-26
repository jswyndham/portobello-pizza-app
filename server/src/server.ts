import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3001;

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
		console.log(error);
		process.exit(1);
	}
};

startServer();
