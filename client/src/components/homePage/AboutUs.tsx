import italianRestaurant from '../../../public/images/italian-restaurant.jpg';
import pastaPic from '../../../public/images/pasta.jpg';

const AboutUs = () => {
	return (
		<article className="h-fit w-full p-2 lg:p-20 2xl:p-32 flex flex-col justify-center items-center bg-gradient-to-b from-white via-red-300 to-primary border-t-2 border-slate-300">
			<div className="flex flex-row w-10/12 bg-slate-100 rounded-xl mx-2 my-4">
				<div className="m-6">
					<img
						src={italianRestaurant}
						alt="Welcome to Portobello"
						className="rounded-xl"
					/>
				</div>
				<div className="flex flex-col w-fit">
					<h1 className="text-2xl lg:text-4xl font-noto-serif-display font-semibold mx-16 py-6">
						Welcome to Portobello!
					</h1>
					<p className="w-11/12 mx-16 text-sans text-xl text-forth space-y-3 tracking-wide p-2">
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
			<div className="flex flex-row-reverse w-10/12">
				<div className="bg-gradient-to-tr from-secondary via-third to-secondary p-2">
					<img
						src={pastaPic}
						alt="Italian Cuisine on the Thai Island of Koh Toa"
						className="w-96"
					/>
				</div>
				<div className="flex flex-col w-fit">
					<h2 className="text-2xl lg:text-4xl font-noto-serif-display font-semibold mx-16 py-6">
						Italian Cuisine on the Thai Island of Koh Toa
					</h2>
					<p className="w-11/12 mx-16 text-sans text-xl text-forth space-y-3 tracking-wide">
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
