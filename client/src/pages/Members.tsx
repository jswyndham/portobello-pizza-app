import { useEffect, useState } from 'react';
import { ErrorMessage, HeadingOne, Loading } from '../components';
import { userData } from '../types/userInterfaces';
import { useAuth } from '../context/AuthContext';
import MemberList from '../components/user/MemberList';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Members = () => {
	const [userMembers, setUserMembers] = useState<userData[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true); // Start with true since we're fetching data

	const navigate = useNavigate();
	const { state } = useAuth();
	const { isLoggedIn, token } = state;

	// Fetch members and populate MemberList
	useEffect(() => {
		const fetchMembers = async () => {
			try {
				// Retrieve the token from local storage
				const token = localStorage.getItem('authToken');
				if (!token) {
					toast.error('You are not authorized to access this page');
					setError('You are not authorized to access this page');
					setIsLoading(false);
					return;
				}

				const response = await fetch(
					`${import.meta.env.VITE_API_BASE_URL}/user`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
						credentials: 'include',
					}
				);

				if (!response.ok) {
					const contentType = response.headers.get('Content-Type');
					if (
						contentType &&
						contentType.includes('application/json')
					) {
						const errorData = await response.json();
						throw new Error(
							errorData.message ||
								`HTTP error! status: ${response.status}`
						);
					} else {
						throw new Error(
							`HTTP error! status: ${response.status}`
						);
					}
				}

				const data = await response.json();

				if (Array.isArray(data)) {
					setUserMembers(data);
				} else {
					toast.error('API response is not an array:', data);
					setError('Unexpected API response format.');
				}
			} catch (error) {
				toast.error('Error fetching members list');
				// Assert error type as Error
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError('An unknown error occurred.');
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchMembers();
	}, [token]);

	// Handle navigate to user audit log
	const handleAuditLog = (userId: string) => {
		navigate(`/admin/auditlog/${userId}`);
	};

	const formatDate = (date: Date): string => {
		return format(date, 'yyyy-MM-dd h:mm a');
	};

	const handleRemoveUser = (userId: string) => {
		setUserMembers((prevMembers) =>
			prevMembers.filter((member) => member._id !== userId)
		);
	};

	if (isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	if (error) {
		return <ErrorMessage errorMessage={error} />;
	}

	if (userMembers.length === 0) {
		return <ErrorMessage errorMessage="No members found" />;
	}

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
			<section className="w-full h-screen bg-main-gradient">
				<article className="w-full pt-36 lg:pt-52 px-1">
					<div className="m-2">
						<HeadingOne headingOneText="Members List" />
					</div>

					{isLoggedIn && (
						<>
							<div className="p-4 lg:mt-12">
								<div className="flex justify-center">
									<div className="w-full xl:w-9/12 2xl:max-w-7xl flex flex-row justify-between h-fit p-2 xl:py-4 xl:px-20 text-sm md:text-lg lg:text-xl bg-black text-white border-b-2 border-forth font-dmsans font-bold">
										<p>User Name</p>
										<p className="md:ml-24">User Status</p>
										<p>Last Logged In</p>
									</div>
								</div>
								<div className="w-full h-fit grid grid-cols-1">
									<AnimatePresence>
										{userMembers.map((userMember) => (
											<motion.div
												key={userMember._id}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -20 }}
												transition={{ duration: 0.3 }}
											>
												<MemberList
													firstName={
														userMember.firstName
													}
													lastName={
														userMember.lastName
													}
													userStatus={
														userMember.userStatus
													}
													lastLogin={
														userMember.lastLogin
															? formatDate(
																	new Date(
																		userMember.lastLogin
																	)
															  )
															: 'Never'
													}
													userId={userMember._id}
													onClick={() =>
														handleAuditLog(
															userMember._id
														)
													}
													onDelete={() =>
														handleRemoveUser(
															userMember._id
														)
													}
												/>
											</motion.div>
										))}
									</AnimatePresence>
								</div>
							</div>
						</>
					)}
				</article>
			</section>
		</>
	);
};

export default Members;
