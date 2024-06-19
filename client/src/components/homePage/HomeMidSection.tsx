import MenuCards from './MenuCards';

function HomeMidSection() {
	return (
		<article className="w-full h-fit flex justify-center bg-gradient-to-b from-third via-secondary to-white">
			<div className="w-10/12 flex flex-col text-center">
				<div className="py-4">
					<h1 className="text-3xl lg:text-4xl 2xl:text-5xl bg-transparent p-4 lg:px-24 lg:pt-20 font-cinzel">
						Porto Bello's Food Menu
					</h1>
				</div>

				<div className="px-2 py-8 lg:p-12 2xl:px-32 2xl:py-16 border-b-2 border-t-2 border-forth">
					<MenuCards />
				</div>
			</div>
		</article>
	);
}

export default HomeMidSection;
