import { FC } from 'react';

interface HeadingOneProps {
	headingOneText: String;
}

const HeadingOne: FC<HeadingOneProps> = ({ headingOneText }) => {
	return (
		<div className=" w-full bg-white bg-opacity-70 mb-6 mt-12 border-y-4 border-forth text-center">
			<h1 className="text-4xl lg:text-5xl 2xl:text-6xl py-3 lg:px-24 font-cinzel">
				{headingOneText}
			</h1>
		</div>
	);
};

export default HeadingOne;
