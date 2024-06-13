import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
	api_key: process.env.CLOUDINARY_API_KEY!,
	api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Define the parameters type for CloudinaryStorage
interface CloudinaryStorageParams {
	folder: string;
	format: string | undefined;
	public_id: string;
}

// Set up Multer storage to use Cloudinary
const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: async (
		req: Express.Request,
		file: Express.Multer.File
	): Promise<CloudinaryStorageParams> => ({
		folder: 'portobello', // Folder name in Cloudinary
		format: 'png', // File format
		public_id: `${Date.now()}-${file.originalname}`, // File name
	}),
});

const upload = multer({ storage });

export { cloudinary, upload };
