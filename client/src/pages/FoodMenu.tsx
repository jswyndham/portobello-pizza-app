import React from 'react';
import FoodMenuCard from '../components/FoodMenu/FoodMenuCard';

function FoodMenu() {
	return (
		<section className="w-screen h-screen bg-gradient-to-b from-white via-red-100 to-primary">
			<article className="pt-32 px-2 lg:p-32">
				<FoodMenuCard />
			</article>
		</section>
	);
}

export default FoodMenu;
