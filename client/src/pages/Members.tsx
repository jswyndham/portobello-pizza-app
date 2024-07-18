import { useEffect, useState } from 'react';
import { HeadingOne, Loading } from '../components';
import { userData } from '../types/userInterfaces';
import { useAuth } from '../context/AuthContext';
import MemberList from '../components/user/MemberList';
import { format } from 'date-fns';

const Members = () => {
	const [userMembers, setUserMembers] = useState<userData[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { state } = useAuth();
	const { isLoggedIn, token } = state;

	useEffect(() => {
		const fetchMembers = async () => {
			setIsLoading(true);
			try {
				if (!token) {
					console.error('No token available');
					return;
				}

				const response = await fetch(
					`http://localhost:5001/api/v1/user`,
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

				if (data && Array.isArray(data)) {
					setUserMembers(data);
				} else {
					console.error('API response is not an array:', data);
					setError('Unexpected API response format.');
				}
			} catch (error) {
				console.error('Error fetching food menu item:', error);
				setIsLoading(false);
			}
		};

		fetchMembers();
	}, []);

	// Loading spinner
	if (!isLoading) {
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

	// No members listed
	if (userMembers.length === 0) {
		return <div>No food items found.</div>;
	}

	const formatDate = (date: Date): string => {
		return format(date, 'yyyy-MM-dd h:mm a');
	};

	return (
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
								{userMembers.map((userMember) => (
									<MemberList
										key={userMember._id}
										firstName={userMember.firstName}
										lastName={userMember.lastName}
										userStatus={userMember.userStatus}
										lastLogin={
											userMember.lastLogin
												? formatDate(
														new Date(
															userMember.lastLogin
														)
												  )
												: 'Never'
										}
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

export default Members;
