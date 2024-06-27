import React from 'react';
import { ImageUploadProps } from '../../types/newFoodItemInterfaces';

const ImageUpload: React.FC<ImageUploadProps> = ({
	imagePreview,
	setImageUrl,
}) => {
	const handleUpload = () => {
		const myWidget = window.cloudinary.createUploadWidget(
			{
				cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME!,
				uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET!,
			},
			(error: any, result: any) => {
				if (!error && result && result.event === 'success') {
					console.log('Done! Here is the image info: ', result.info);
					setImageUrl(result.info.secure_url);
				}
			}
		);
		myWidget.open();
	};

	return (
		<div className="flex flex-col">
			<button
				onClick={handleUpload}
				className="p-3 mb-3 bg-blue-500 text-white rounded-md"
			>
				Upload Image
			</button>
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
