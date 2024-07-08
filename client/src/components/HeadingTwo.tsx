import { FC } from 'react';

interface HeadingTwoProps {
	headingTwoText: String;
}

const HeadingTwo: FC<HeadingTwoProps> = ({ headingTwoText }) => {
	return (
		<div className=" w-full mb-6 mt-12 border-t-2 border-b-2 border-forth text-center">
			<h2 className="text-4xl lg:text-5xl 2xl:text-6xl py-3 lg:px-24 font-cinzel">
				{headingTwoText}
			</h2>
		</div>
	);
};

export default HeadingTwo;
