import { FC } from 'react';

interface itemNotFoundProp {
	item: string;
}

const ItemNotFound: FC<itemNotFoundProp> = ({ item }) => {
	return (
		<article className="h-24 w-11/12 bg-slate-600 flex justify-center items-center rounded-md drop-shadow-xl border border-yellow-200">
			<div>
				<p className="text-xl font-montserrat italic font-semibold text-white">
					No {item} found
				</p>
			</div>
		</article>
	);
};

export default ItemNotFound;
