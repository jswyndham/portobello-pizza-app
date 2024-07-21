import { FC } from 'react';
import { AuditLogProps } from '../../types/auditLogInterface';

const AuditLogList: FC<AuditLogProps> = ({
	_id,
	createdAt,
	subjectType,
	details,
}) => {
	const renderDetails = (details: Record<string, any>) => {
		return Object.entries(details).map(([key, value]) => (
			<div
				key={key}
				className="flex flex-col lg:flex-row py-2 font-montserrat"
			>
				<strong>{key}:</strong>{' '}
				<p className="px-3">{JSON.stringify(value)}</p>
			</div>
		));
	};

	return (
		<>
			<article
				key={_id}
				className="relative w-full flex justify-center my-4 p-3"
			>
				<div className="w-full h-fit xl:w-9/12 2xl:max-w-5xl flex flex-col p-4 md:p-10 xl:py-4 xl:px-20 text-lg md:text-xl bg-card-gradient border-2 border-forth">
					<div className="flex flex-row justify-start py-2">
						<p className="mr-3 font-bold">Date & Time:</p>
						<p className="text-blue-600">{createdAt}</p>
					</div>
					<div className="flex row justify-start py-3 md:py-0">
						<p className="mr-3 font-bold">Subject Type:</p>
						<p className="text-third font-semibold">
							{subjectType}
						</p>
					</div>
					<div>{renderDetails(details)}</div>
				</div>
			</article>
		</>
	);
};

export default AuditLogList;
