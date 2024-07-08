import { FC } from 'react';

interface confirmDeleteProps {
	message: String;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmDeleteModal: FC<confirmDeleteProps> = ({
	message,
	onConfirm,
	onCancel,
}) => {
	return (
		<article>
			<div className="fixed h-full w-full top-0 left-0 bg-gray-700 inset-0 opacity-70 z-40"></div>
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div className="h-56 lg:max-w-3xl mx-2 lg:mx-0 rounded-lg drop-shadow-md shadow-md shadow-slate-400 border-solid border-2 border-third bg-white">
					<div className="modal">
						<div className="flex justify-center m-10">
							<p className="text-2xl font-serif text-center">
								{message}
							</p>
						</div>
						<div className="flex flex-row justify-between md:justify-around mt-16 md:mt-20">
							<button
								type="button"
								onClick={onConfirm}
								className="w-full h-fit py-1 px-1 md:px-4 ml-6 mr-4 text-lg bg-red-600 text-white rounded-lg hover:bg-red-700 hover:shadow-md hover:shadow-slate-400 active:bg-red-500 active:shadow-sm active:shadow-slate-500"
							>
								delete
							</button>
							<button
								type="button"
								onClick={onCancel}
								className="w-full h-fit py-1 px-1 md:px-4 mr-6 ml-4 border border-black text-lg bg-white text-black rounded-lg hover:bg-slate-200 hover:shadow-md hover:shadow-slate-400 active:bg-slate-200 active:shadow-sm active:shadow-slate-500"
							>
								cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};

export default ConfirmDeleteModal;
