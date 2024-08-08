import { ImageUploadProps } from '../../types/foodItemInterfaces';
import { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

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
						const file = result.info;
						setImageUrl(file);
					} else if (error) {
						toast.error('Upload error:', error);
					}
				}
			);
		}
	}, [setImageUrl]);

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				className="toast-container"
				toastClassName="toast"
			/>
			<div className="flex flex-col my-2">
				<button
					type="button"
					onClick={() => {
						if (widgetRef.current) {
							widgetRef.current.open();
						}
					}}
					className="text-lg p-3 my-5 bg-green-500 text-white rounded-md font-bold border border-slate-500 drop-shadow-lg hover:shadow-md hover:shadow-slate-400 hover:bg-green-600"
				>
					Upload Image
				</button>
				{imagePreview && (
					<div className="mb-3">
						<p className="py-2 text-xl font-noto-serif-display font-semibold">
							Image Preview:
						</p>
						<img
							src={imagePreview}
							alt="Image Preview"
							className="w-56 h-48 object-cover drop-shadow-lg shadow-md shadow-slate-400 rounded-md"
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default ImageUpload;
