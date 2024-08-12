import { FC, useState } from 'react';
import { useDataProps } from '../../types/userInterfaces';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RxCross2 } from 'react-icons/rx';
import { AnimatePresence } from 'framer-motion';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';

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
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Auth context & global state
	const { state } = useAuth();
	const { isLoggedIn } = state;
	const { token } = state;

	const onSubmitDelete = async (id: string) => {
		try {
			setIsLoading(true);

			if (!token) {
				toast.error('No token available');
				setError('No token available');
				return;
			}

			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/user/${id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					credentials: 'include',
				}
			);
			if (response.ok) {
				onDelete(); // Call the onDelete function to update the state
				toast.success('You have successfully deleted a user profile');
			} else {
				const errorData = await response.json();
				toast.error(
					`User profile was not deleted: ${errorData.message}`
				);
				setError(
					`Failed to delete user profile:
					${errorData.message}`
				);
			}
		} catch (error) {
			toast.error('An error occurred while deleting the user profile');
			setError('Error deleting item');
		} finally {
			setIsLoading(false);
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

	// Loading Screen
	if (isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	// Error screen
	if (error) {
		return <ErrorMessage errorMessage={error} />;
	}

	return (
		<>
			{isLoggedIn && (
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
			)}
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

					<div className="w-64 flex flex-row justify-start hover:text-blue-600">
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
