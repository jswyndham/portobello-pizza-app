import { FC } from 'react';

interface HeadingTwoProps {
	headingTwoText: string;
	id?: string;
}

const HeadingTwo: FC<HeadingTwoProps> = ({ headingTwoText, id }) => {
	return (
		<div
			id={id}
			className="w-full bg-heading-two-gradient mb-6 mt-12 border-t-2 border-b-2 border-forth text-center"
		>
			<h2 className="text-3xl lg:text-4xl 2xl:text-5xl py-3 lg:px-24 font-cinzel">
				{headingTwoText}
			</h2>
		</div>
	);
};

export default HeadingTwo;
