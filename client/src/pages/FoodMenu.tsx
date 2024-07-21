import { HeadingOne, HeadingTwo } from '../components';
import FoodMenuCard from '../components/MenuCards/FoodMenuCard';

function FoodMenu() {
	return (
		<section className="w-screen h-full bg-main-gradient">
			<article className="pt-12 px-2 lg:p-24 flex flex-col justify-center items-center">
				<HeadingOne headingOneText={'Food Menu'} />

				{/* PIZZA */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center">
						<HeadingTwo headingTwoText="PIZZA" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="PIZZA" />
					</div>
				</article>

				{/* PASTA */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="PASTA" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="PASTA" />
					</div>
				</article>

				{/* CALZONE */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="CALZONE" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="CALZONE" />
					</div>
				</article>

				{/* STARTER */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="STARTER" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="STARTER" />
					</div>
				</article>

				{/* MAIN */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="MAIN" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="MAIN" />
					</div>
				</article>

				{/* SIDES */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="SIDES" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="SIDES" />
					</div>
				</article>

				{/* SALAD */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="SALAD" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="SALAD" />
					</div>
				</article>

				{/* DESSERT */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="DESSERT" />
					</div>
					<div className="w-full xl:w-11/12 2xl:max-w-6xl flex justify-center items-center">
						<FoodMenuCard category="DESSERT" />
					</div>
				</article>
			</article>
		</section>
	);
}

export default FoodMenu;
