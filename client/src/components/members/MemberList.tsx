import { FC } from 'react';
import { useDataProps } from '../../types/userInterfaces';

const MemberList: FC<useDataProps> = ({
	firstName,
	lastName,
	userStatus,
	lastLogin,
}) => {
	return (
		<>
			<article className="relative w-full flex justify-center mt-2">
				<div className="w-full xl:w-9/12 2xl:max-w-7xl flex flex-col md:flex-row justify-between h-fit p-4 xl:py-4 xl:px-20 text-lg md:text-xl bg-card-gradient border-b-2 border-forth">
					<div className="flex flex-row justify-start">
						<p>{firstName}</p>
						<p className="ml-3">{lastName}</p>
					</div>
					<div className="py-2 md:py-0">
						<p className="text-third">{userStatus}</p>
					</div>
					<div>
						<p className="italic">{lastLogin}</p>
					</div>
				</div>
			</article>
		</>
	);
};

export default MemberList;
