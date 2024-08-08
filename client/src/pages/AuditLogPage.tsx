import { useEffect, useState } from 'react';
import { ErrorMessage, HeadingOne, Loading } from '../components';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { AuditLog } from '../types/auditLogInterface';
import { useParams } from 'react-router-dom';
import AuditLogList from '../components/user/AuditLogList';
import { ToastContainer, toast } from 'react-toastify';

const AuditLogs = () => {
	const { id } = useParams<{ id: string }>();

	const [auditLog, setAuditLog] = useState<AuditLog[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);

	const { state } = useAuth();
	const { isLoggedIn, token } = state;

	const fetchAuditLogs = async (page: number) => {
		setIsLoading(true);
		try {
			if (!token) {
				toast.error('No token available');
				setError('No token available');
				setIsLoading(false);
				return;
			}

			const response = await fetch(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/auditlogs/${id}?page=${page}&limit=20`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					credentials: 'include',
				}
			);

			const data = await response.json();

			if (data && data.data && Array.isArray(data.data.auditLogs)) {
				setAuditLog(data.data.auditLogs);
				setCurrentPage(data.data.page);
				setTotalPages(data.data.totalPages);
			} else {
				toast.error('API response is not in expected format:', data);
				setError('Unexpected API response format.');
			}
		} catch (error) {
			toast.error('Error fetching audit logs');
			setError('Error fetching audit logs');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAuditLogs(currentPage);
	}, [id, token, currentPage]);

	const formatDate = (date: Date): string => {
		return format(date, 'yyyy-MM-dd h:mm a');
	};

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <ErrorMessage errorMessage={error} />;
	}

	if (auditLog.length === 0) {
		return <div>No audit logs found.</div>;
	}

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
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
			<section className="w-full h-full bg-main-gradient">
				<article className="w-full pt-36 lg:pt-52 px-1">
					<div className="m-2">
						<HeadingOne headingOneText="Audit Logs" />
					</div>
					{isLoggedIn && (
						<>
							<div className="p-4 lg:mt-12 flex flex-col justify-center items-center">
								<div className="w-full h-fit grid grid-cols-1">
									{auditLog.map((auditLogs) => (
										<AuditLogList
											key={auditLogs._id.toString()}
											_id={auditLogs._id.toString()}
											createdAt={
												auditLogs.createdAt
													? formatDate(
															new Date(
																auditLogs.createdAt
															)
													  )
													: 'Never'
											}
											subjectType={auditLogs.subjectType}
											details={auditLogs.details}
										/>
									))}
								</div>

								<div className="w-11/12 2xl:w-6/12 mt-4 flex justify-center text-xl space-x-32 md:space-x-96">
									<button
										type="button"
										onClick={handlePrevPage}
										disabled={currentPage === 1}
										className={`btn ${
											currentPage === 1
												? 'hidden'
												: 'text-blue-200 font-bold hover:underline hover:underline-offset-4 hover:text-blue-400 p-12'
										}`}
									>
										Prev
									</button>
									<button
										type="button"
										onClick={handleNextPage}
										disabled={currentPage === totalPages}
										className={`btn ${
											currentPage === totalPages
												? 'hidden'
												: 'text-blue-200 font-bold hover:underline hover:underline-offset-4 hover:text-blue-400 p-12'
										}`}
									>
										Next
									</button>
								</div>
							</div>
						</>
					)}
				</article>
			</section>
		</>
	);
};

export default AuditLogs;
