import express, { Request, Response } from 'express';
import FoodMenu from '../models/FoodMenuModel';
import { upload } from '../cache/cloudinaryConfig';

const router = express.Router();

router.post(
	'/upload',
	upload.single('image'),
	async (req: Request, res: Response) => {
		try {
			if (!req.file) {
				return res.status(400).send('No file uploaded.');
			}

			// Save the Cloudinary URL in MongoDB
			const newFoodMenu = new FoodMenu({
				menuCategory: req.body.menuCategory,
				pizzaType: req.body.pizzaType,
				name: req.body.name,
				imageUrl: req.file.path, // Save the Cloudinary URL
				ingredients: req.body.ingredients,
				price: req.body.price,
			});

			await newFoodMenu.save();

			res.status(201).json({
				message: 'Food menu item created successfully',
				newFoodMenu,
			});
		} catch (error: any) {
			console.error('Error uploading image:', error);
			res.status(500).json({
				message: 'Error uploading image',
				error: error.message,
			});
		}
	}
);

export default router;
