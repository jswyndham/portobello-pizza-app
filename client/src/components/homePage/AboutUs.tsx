import HeadingTwo from '../HeadingTwo';
import italianRestaurant from '/images/italian-restaurant.jpg';
import pastaPic from '/images/pasta.jpg';

const AboutUs = () => {
	const headingAboutUs = 'Porto Bello - About Us';

	return (
		<article className="h-fit w-full 2xl:w-10/12 2xl:max-w-screen-2xl p-1 lg:p-14 2xl:px-28 2xl:py-12 flex flex-col justify-center items-center">
			{/* Heading */}
			<HeadingTwo headingTwoText={headingAboutUs} />

			<div className="h-fit flex flex-col xl:flex-row w-full items-center mx-1 my-4 lg:mb-16 lg:mt-8 lg:px-20 xl:px-0">
				<div className="my-2 lg:my-0 lg:mr-4 ">
					<img
						src={italianRestaurant}
						alt="Welcome to Portobello"
						className="rounded-md"
					/>
				</div>
				<div className="flex flex-col w-fit bg-slate-300 bg-opacity-30 lg:bg-opacity-30 border border-slate-400 p-6 lg:my-8 rounded-md shadow-lg shadow-slate-400">
					<h3 className="text-3xl lg:text-4xl font-cinzel ml-4 lg:ml-12 py-3 lg:py-6">
						Welcome to Portobello!
					</h3>
					<p className="w-full text-sans text-lg ld:text-xl text-forth tracking-wide lg:tracking-wider font-montserrat">
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the
						industry's standard dummy text ever since the 1500s,
						when an unknown printer took a galley of type and
						scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into
						electronic typesetting, remaining essentially unchanged.
						It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and
						more recently with desktop publishing software like
						Aldus PageMaker including versions of Lorem Ipsum.
					</p>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center md:flex-row-reverse w-full 3xl:w-8/12 rounded-xl mx-1 my-4">
				<div className="my-2 lg:my-0 ml-4">
					<img
						src={pastaPic}
						alt="Italian Cuisine on the Thai Island of Koh Toa"
						className="rounded-md w-96"
					/>
				</div>
				<div className="flex flex-col w-fit lg:w-96 xl:w-full mb-5 bg-slate-300 bg-opacity-30 p-6 lg:p-12 border border-slate-400 rounded-md shadow-lg shadow-slate-500">
					<h3 className="text-3xl lg:text-4xl font-cinzel ml-4 py-3 lg:pb-6">
						Italian Cuisine on the Thai Island of Koh Toa
					</h3>
					<p className="w-full text-sans text-lg ld:text-xl text-forth tracking-wide lg:tracking-wider font-montserrat">
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the
						industry's standard dummy text ever since the 1500s,
						when an unknown printer took a galley of type and
						scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into
						electronic typesetting, remaining essentially unchanged.
						It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and
						more recently with desktop publishing software like
						Aldus PageMaker including versions of Lorem Ipsum.
					</p>
				</div>
			</div>
		</article>
	);
};

export default AboutUs;
