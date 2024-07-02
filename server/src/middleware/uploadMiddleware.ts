import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { CloudinaryStorageParams } from '../constants';

dotenv.config();

if (
	!process.env.CLOUDINARY_CLOUD_NAME ||
	!process.env.CLOUDINARY_API_KEY ||
	!process.env.CLOUDINARY_API_SECRET
) {
	throw new Error('Missing Cloudinary environment variables.');
}

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: async (
		req: Express.Request,
		file: Express.Multer.File
	): Promise<CloudinaryStorageParams> => ({
		folder: 'portobello',
		format: 'jpg',
		public_id: `${Date.now()}-${file.originalname}`,
	}),
});

const upload = multer({ storage });

export { upload };
