import { useEffect, useState } from 'react';
import { HeadingOne, Loading } from '../components';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { AuditLog } from '../types/auditLogInterface';
import { useParams } from 'react-router-dom';
import AuditLogList from '../components/user/AuditLogList';

const AuditLogs = () => {
	const { id } = useParams<{ id: string }>();

	const [auditLog, setAuditLog] = useState<AuditLog[]>([]); // Initialize as empty array
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { state } = useAuth();
	const { isLoggedIn, token } = state;

	useEffect(() => {
		const fetchAuditLogs = async () => {
			setIsLoading(true);
			try {
				if (!token) {
					console.error('No token available');
					setError('No token available');
					setIsLoading(false);
					return;
				}

				const response = await fetch(
					`http://localhost:5001/api/v1/auditlogs/${id}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
						credentials: 'include',
					}
				);

				const data = await response.json();
				console.log('Fetched Data:', data);
				console.log('Loading is :', isLoading);

				if (data && data.data && Array.isArray(data.data.auditLogs)) {
					setAuditLog(data.data.auditLogs);
				} else {
					console.error(
						'API response is not in expected format:',
						data
					);
					setError('Unexpected API response format.');
				}
			} catch (error) {
				console.error('Error fetching audit logs:', error);
				setError('Error fetching audit logs');
			} finally {
				setIsLoading(false);
			}
		};

		fetchAuditLogs();
	}, [id, token]);

	// Loading spinner
	if (isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	// Error warning
	if (error) {
		return <div>{error}</div>;
	}

	// No audit logs found
	if (auditLog.length === 0) {
		return <div>No audit logs found.</div>;
	}

	const formatDate = (date: Date): string => {
		return format(date, 'yyyy-MM-dd h:mm a');
	};

	return (
		<section className="w-full h-full bg-main-gradient">
			<article className="w-full pt-36 lg:pt-52 px-1">
				<div className="m-2">
					<HeadingOne headingOneText="Audit Logs" />
				</div>
				{isLoggedIn && (
					<>
						<div className="p-4 lg:mt-12">
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
						</div>
					</>
				)}
			</article>
		</section>
	);
};

export default AuditLogs;
