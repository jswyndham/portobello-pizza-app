import React from 'react';
import { ImageUploadProps } from '../../types/newFoodItemInterfaces';

const ImageUpload: React.FC<ImageUploadProps> = ({
	imagePreview,
	onImageUpload,
}) => {
	return (
		<div className="flex flex-col">
			<div className="flex flex-col">
				<label
					htmlFor="imageUrl"
					className="font-handlee-regular text-lg p-2 font-semibold"
				>
					Image Upload
				</label>
				<input
					type="file"
					onChange={onImageUpload}
					placeholder="Find image file"
					className="p-3 mb-3 bg-amber-50 drop-shadow-sm rounded-md border border-slate-300"
				/>
			</div>
			{imagePreview && (
				<div className="mb-3">
					<p>Image Preview:</p>
					<img
						src={imagePreview}
						alt="Image Preview"
						className="w-56 h-48 object-cover drop-shadow-lg shadow-md shadow-slate-400 rounded-md"
					/>
				</div>
			)}
		</div>
	);
};

export default ImageUpload;
