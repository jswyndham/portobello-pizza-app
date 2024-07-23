import { FC, useState } from 'react';
import { useDataProps } from '../../types/userInterfaces';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';
import { AnimatePresence } from 'framer-motion';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';

interface MemberListProps extends useDataProps {
	onDelete: () => void;
}

const MemberList: FC<MemberListProps> = ({
	firstName,
	lastName,
	userStatus,
	lastLogin,
	userId,
	onClick,
	onDelete,
}) => {
	const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
	const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);

	const { state } = useAuth();
	const { token } = state;

	const onSubmitDelete = async (id: string) => {
		try {
			if (!token) {
				console.error('No token available');
				return;
			}

			const response = await fetch(
				`http://localhost:5001/api/v1/user/${id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					credentials: 'include',
				}
			);
			if (response.ok) {
				toast.success('You have successfully deleted a user profile');
				onDelete(); // Call the onDelete function to update the state
			} else {
				const errorData = await response.json();
				toast.error(
					`User profile was not deleted: ${errorData.message}`
				);
				console.error(
					'Failed to delete user profile:',
					errorData.message
				);
			}
		} catch (error) {
			console.error('Error deleting item:', error);
			toast.error('An error occurred while deleting the user profile');
		}
	};

	const handleDelete = (id: string, event: React.MouseEvent) => {
		event.stopPropagation(); // Prevent propagation to the parent element
		setIsDeleteOpen(true);
		setItemIdToDelete(id);
	};

	const confirmDelete = (event: React.MouseEvent) => {
		event.stopPropagation(); // Prevent propagation to the parent element
		if (itemIdToDelete) {
			onSubmitDelete(itemIdToDelete);
			setIsDeleteOpen(false);
			setItemIdToDelete(null);
		}
	};

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
			<article
				onClick={onClick}
				className="relative w-full flex justify-center mt-2 hover:cursor-pointer"
			>
				<div className="w-full xl:w-9/12 2xl:max-w-7xl flex flex-col lg:flex-row justify-between h-fit p-4 xl:py-4 xl:px-20 text-lg md:text-xl bg-card-gradient border-b-2 border-forth">
					{userStatus === 'MANAGER' && (
						<div className="w-full lg:hidden flex justify-end -ml-14">
							<div
								onClick={(e) => {
									e.stopPropagation();
									handleDelete(userId, e);
								}}
								className="w-5 h-5 bg-red-500 text-white rounded-full text-xl hover:cursor-pointer hover:bg-red-600 -mr-14 hover:shadow-md hover:shadow-slate-400"
							>
								<RxCross2 />
							</div>
						</div>
					)}

					<div className="w-64 flex flex-row justify-start">
						<p>{firstName}</p>
						<p className="ml-3">{lastName}</p>
					</div>
					<div className="w-20 flex justify-start lg:justify-center lg:items-center py-2 md:py-0">
						<div>
							<p className="text-third">{userStatus}</p>
						</div>
					</div>
					<div>
						<p className="italic">{lastLogin}</p>
					</div>
					{userStatus === 'MANAGER' ? (
						<div
							onClick={(e) => {
								e.stopPropagation();
								handleDelete(userId, e);
							}}
							className="hidden w-7 h-7 lg:flex justify-center items-center bg-red-500 text-white rounded-full text-xl hover:cursor-pointer hover:bg-red-700 xl:-mr-14 hover:shadow-md hover:shadow-slate-400"
						>
							<RxCross2 />
						</div>
					) : (
						<div className="mr-7 xl:-mr-10"></div>
					)}
				</div>
				<AnimatePresence>
					{isDeleteOpen && (
						<ConfirmDeleteModal
							message="Are you sure you want to delete this user?"
							onConfirm={confirmDelete}
							onCancel={(e) => {
								e.stopPropagation(); // Prevent propagation to the parent element
								setIsDeleteOpen(false);
							}}
						/>
					)}
				</AnimatePresence>
			</article>
		</>
	);
};

export default MemberList;
