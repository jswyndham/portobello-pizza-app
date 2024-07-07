import FoodMenuCard from '../components/FoodMenu/FoodMenuCard';

function FoodMenu() {
	return (
		<section className="w-screen h-full bg-main-gradient">
			<article className="pt-12 px-2 lg:p-32 flex flex-col justify-center">
				<div className=" w-full mb-16 mt-12 border-t-2 border-b-2 border-forth text-center">
					<h2 className="text-4xl lg:text-5xl 2xl:text-6xl py-3 lg:px-24 font-cinzel">
						Food Menu
					</h2>
				</div>
				<div className="mx-auto">
					<FoodMenuCard />
				</div>
			</article>
		</section>
	);
}

export default FoodMenu;
