import { TailSpin } from 'react-loading-icons';

const Loading = () => {
	return (
		<div className="h-screen w-screen flex flex-row items-center justify-center text-2xl text-primary">
			<TailSpin className="text-primary" />
			<div className="px-6">Loading...</div>
		</div>
	);
};

export default Loading;
