import { EditFoodItem } from '../components/menuItems';
import { Outlet } from 'react-router-dom';

const EditFoodPage = () => {
	return (
		<section className="flex justify-center align-middle w-full bg-gradient-to-b from-white via-white to-primary pt-18">
			<article className="w-full 3xl:w-9/12 4xl:w-7/12 h-fit overflow-hidden pb-24">
				<div className="relative h-36 mt-12 lg:mt-36 2xl:ml-36">
					<div className="mt-12 w-24 h-24 m-5 pl-6 bg-forth rounded-xl drop-shadow-2xl"></div>
					<div className="absolute top-0 left-12 w-40 h-72 m-5 pl-6 bg-yellow-600 rounded-md shadow-xl shadow-slate-500">
						<h1 className="text-primary text-4xl md:text-5xl font-thin tracking-tighter">
							edit
						</h1>
						<h1 className="text-forth font-roboto font-bold text-7xl tracking-widest">
							FOOD MENU
						</h1>
					</div>
				</div>

				<EditFoodItem />
			</article>
			<Outlet />
		</section>
	);
};

export default EditFoodPage;
