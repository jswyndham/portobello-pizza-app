import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeadingOne, HeadingTwo } from '../components';
import FoodMenuCard from '../components/MenuCards/FoodMenuCard';

function FoodMenu() {
	const { hash } = useLocation();

	useEffect(() => {
		if (hash) {
			const element = document.querySelector(hash);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}, [hash]);

	return (
		<section className="w-screen h-full bg-main-gradient">
			<article className="pt-12 px-2 lg:p-24 flex flex-col justify-center items-center">
				<HeadingOne headingOneText={'Food Menu'} />

				{/* PIZZA */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center">
						<HeadingTwo headingTwoText="PIZZA" id="pizza" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="PIZZA" />
					</div>
				</article>

				{/* PASTA */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="PASTA" id="pasta" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="PASTA" />
					</div>
				</article>

				{/* CALZONE */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="CALZONE" id="calzone" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="CALZONE" />
					</div>
				</article>

				{/* STARTER */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="STARTER" id="starters" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="STARTER" />
					</div>
				</article>

				{/* MAIN */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="MAIN" id="mains" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="MAIN" />
					</div>
				</article>

				{/* SIDES */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="SIDES" id="sides" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="SIDES" />
					</div>
				</article>

				{/* SALAD */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="SALAD" id="salad" />
					</div>
					<div className="w-full flex justify-center items-center">
						<FoodMenuCard category="SALAD" />
					</div>
				</article>

				{/* DESSERT */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
						<HeadingTwo headingTwoText="DESSERT" id="dessert" />
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
