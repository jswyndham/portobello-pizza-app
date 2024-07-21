import { FC } from 'react';

interface CardHeadingsProps {
	CardHeading: string;
	backImage: string;
	backImageAlt: string;
}

const CardHeadings: FC<CardHeadingsProps> = ({
	CardHeading,
	backImage,
	backImageAlt,
}) => {
	return (
		<div className="relative h-28 w-full flex justify-center py-8">
			<img
				src={backImage}
				alt={backImageAlt}
				className="h-24 w-11/12 md:w-9/12 lg:w-8/12 xl:max-w-2xl rounded-sm drop-shadow-xl shadow-lg shadow-slate-500"
			/>
			<div className="absolute bg-slate-200 bg-opacity-85 w-11/12 md:w-9/12 lg:w-8/12 xl:max-w-2xl h-24 top-8 justify-center flex text-center items-center rounded-sm">
				<h2 className="w-11/12 text-4xl lg:text-5xl font-cinzel text-black border-y-2 border-slate-500 py-3">
					{CardHeading}
				</h2>
			</div>
		</div>
	);
};

export default CardHeadings;
