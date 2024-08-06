import { FC } from 'react';

interface itemNotFoundProp {
	item: string;
}

const ItemNotFound: FC<itemNotFoundProp> = ({ item }) => {
	return (
		<article className="h-full w-full flex justify-center items-center min-h-screen">
			<div className="w-4/12 p-6 -mt-52 bg-slate-600 text-center drop-shadow-xl border-2 border-red-500 shadow-lg shadow-slate-500">
				<p className="text-lg lg:text-2xl font-montserrat italic font-semibold text-white">
					No {item} found
				</p>
			</div>
		</article>
	);
};

export default ItemNotFound;
