import { FC } from 'react';
import { motion } from 'framer-motion';

interface ConfirmDeleteProps {
	message: string;
	onConfirm: (event: React.MouseEvent) => void;
	onCancel: (event: React.MouseEvent) => void;
}

const ConfirmDeleteModal: FC<ConfirmDeleteProps> = ({
	message,
	onConfirm,
	onCancel,
}) => {
	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 0.7, transition: { duration: 0.3 } },
	};

	const modalVariants = {
		hidden: { opacity: 1, y: '-100vh' },
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: 'spring', stiffness: 100, damping: 10 },
		},
		exit: {
			opacity: 1,
			y: '100vh',
			transition: { type: 'spring', stiffness: 100, damping: 30 },
		},
	};

	return (
		<article>
			<motion.div
				initial="hidden"
				animate="visible"
				exit="hidden"
				variants={overlayVariants}
				className="fixed inset-0 bg-gray-700 z-40"
			></motion.div>
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={modalVariants}
				className="fixed inset-0 flex items-center justify-center z-50"
			>
				<div className="h-64 w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 lg:max-w-lg mx-2 lg:mx-0 rounded-lg drop-shadow-md shadow-md shadow-slate-400 border-solid border-2 border-third bg-white">
					<div className="modal">
						<div className="flex justify-center m-10">
							<p className="text-2xl font-serif text-center">
								{message}
							</p>
						</div>
						<div className="flex flex-row justify-between md:justify-around pt-8">
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
								className="w-full h-fit py-1 px-1 md:px-4 mr-6 ml-4 border border-black text-lg bg-white text-black rounded-lg hover:bg-slate-100 hover:shadow-md hover:shadow-slate-400 active:bg-slate-200 active:shadow-sm active:shadow-slate-500"
							>
								cancel
							</button>
						</div>
					</div>
				</div>
			</motion.div>
		</article>
	);
};

export default ConfirmDeleteModal;
