import MenuCards from './MenuCards';

function HomeMidSection() {
	return (
		<article className="w-full h-fit flex justify-center">
			<div className="w-10/12 flex flex-col text-center">
				<div className="mb-3 mt-10 border-t-2 border-b-2 border-forth">
					<h1 className="text-3xl lg:text-4xl 2xl:text-6xl py-3 lg:px-24 font-cinzel">
						Porto Bello's Food Menu
					</h1>
				</div>

				<div className="px-2 py-8 lg:p-12 2xl:px-32 2xl:py-16">
					<MenuCards />
				</div>
			</div>
		</article>
	);
}

export default HomeMidSection;
