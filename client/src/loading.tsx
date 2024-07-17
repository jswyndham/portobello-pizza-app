import { SpinningCircles } from 'react-loading-icons';

const loading = () => {
	return (
		<div className="h-screen flex flex-row items-center justify-center text-2xl text-primary">
			<SpinningCircles />
			<div>Loading...</div>
		</div>
	);
};

export default loading;
