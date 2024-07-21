import { HeadingOne } from '../components';
import FoodMenuCard from '../components/MenuCards/FoodMenuCard';

function FoodMenu() {
	return (
		<section className="w-screen h-screen bg-main-gradient">
			<article className="pt-12 px-2 lg:p-24 flex flex-col justify-center">
				<HeadingOne headingOneText={'Food Menu'} />

				<div className="mx-auto">
					<FoodMenuCard />
				</div>
			</article>
		</section>
	);
}

export default FoodMenu;
