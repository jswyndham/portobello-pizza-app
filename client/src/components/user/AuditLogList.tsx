import { FC } from 'react';
import { AuditLogProps } from '../../types/auditLogInterface';

const AuditLogList: FC<AuditLogProps> = ({
	_id,
	createdAt,
	action,
	subjectType,
	details,
}) => {
	return (
		<>
			<article
				key={_id}
				className="relative w-full flex justify-center mt-2"
			>
				<div className="w-full xl:w-9/12 2xl:max-w-7xl flex flex-col md:flex-row justify-between h-fit p-4 xl:py-4 xl:px-20 text-lg md:text-xl bg-card-gradient border-b-2 border-forth">
					<div className="w-64 flex flex-row justify-start">
						<p>{createdAt}</p>
						<p className="ml-3">{action}</p>
					</div>
					<div className="w-20 flex justify-center items-center py-2 md:py-0">
						<div>
							<p className="text-third">{subjectType}</p>
						</div>
					</div>
					<div>
						<p className="italic">{details}</p>
					</div>
				</div>
			</article>
		</>
	);
};

export default AuditLogList;
