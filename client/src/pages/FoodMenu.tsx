import FoodMenuCard from '../components/FoodMenu/FoodMenuCard';

function FoodMenu() {
	return (
		<section className="w-screen h-full bg-gradient-to-b from-white via-white to-primary">
			<article className="pt-32 px-2 lg:p-32 flex justify-center">
				<FoodMenuCard />
			</article>
		</section>
	);
}

export default FoodMenu;
