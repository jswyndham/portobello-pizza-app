import { ImageUploadProps } from '../../types/newFoodItemInterfaces';
import { useEffect, useRef } from 'react';

const ImageUpload: React.FC<ImageUploadProps> = ({
	imagePreview,
	setImageUrl,
}) => {
	const cloudinaryRef = useRef<any>(null);
	const widgetRef = useRef<any>(null);

	useEffect(() => {
		if (window.cloudinary) {
			cloudinaryRef.current = window.cloudinary;
			widgetRef.current = cloudinaryRef.current.createUploadWidget(
				{
					cloudName: 'ducq9yzyn',
					uploadPreset: 'u9bu7hdq',
				},
				(error: any, result: any) => {
					if (!error && result && result.event === 'success') {
						console.log(
							'Done! Here is the image info: ',
							result.info
						);
						const file = result.info; // Assuming this is the file object
						setImageUrl(file);
					} else if (error) {
						console.error('Upload error:', error);
					}
				}
			);
		}
	}, [setImageUrl]);

	return (
		<div className="flex flex-col">
			<button
				onClick={() => {
					if (widgetRef.current) {
						widgetRef.current.open();
					}
				}}
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
