import HeadingTwo from '../HeadingTwo';
import italianRestaurant from '/images/italian-restaurant.jpg';
import pastaPic from '/images/pasta.jpg';

const AboutUs = () => {
	const headingAboutUs = 'Porto Bello - About Us';

	return (
		<article className="h-fit w-full md:w-10/12 lg:w-11/12 2xl:w-11/12 2xl:max-w-screen-2xl p-3 xl:p-14 2xl:px-28 2xl:py-12 flex flex-col justify-center items-center">
			{/* Heading */}
			<HeadingTwo headingTwoText={headingAboutUs} />

			<div className="h-fit flex flex-col 2xl:flex-row w-full items-center mx-1 my-4 lg:mb-16 lg:mt-8 lg:px-20 xl:px-0">
				<div className="my-2 lg:my-0 lg:mr-4 ">
					<img
						src={italianRestaurant}
						alt="Welcome to Portobello"
						loading="lazy"
						className="rounded-md"
					/>
				</div>
				<div className="flex flex-col w-fit bg-slate-300 bg-opacity-30 lg:bg-opacity-30 border border-slate-400 p-6 lg:my-8 rounded-md shadow-lg shadow-slate-400">
					<h3 className="text-3xl lg:text-4xl font-cinzel ml-4 lg:ml-12 py-3 lg:py-6">
						Welcome to Portobello!
					</h3>
					<p className="w-full text-sans text-lg ld:text-xl text-forth tracking-wide lg:tracking-wider font-montserrat">
						Porto Bello, in Koh Tao, Thailand, has been the number
						one local Italian cuisine restaurant since 2006. We are
						located at the quieter end of the Koh Tao walking
						street, offering a serene spot near the beautiful Sairee
						Beach. Our Koh Tao restaurant offers an open and
						inviting atmosphere with beach vibes. Porto Bello is
						known to both Koh Tao locals and tourists for its
						friendly staff, professional service, and good food.
						With a menu that features classic Italian dishes and
						fresh, local ingredients. If you're in Koh Tao,
						Thailand, come down to Porto Bello to enjoy a tropical
						Italian experience. We offer true Mediterranean flavors
						right here on Koh Tao Island.
					</p>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center xl:flex-row-reverse w-full rounded-xl mx-1 my-4">
				<div className="flex justify-center my-2 lg:p-4 ml-4">
					<img
						src={pastaPic}
						alt="Italian Cuisine on the Thai Island of Koh Toa"
						loading="lazy"
						className="rounded-md w-11/12 lg:w-8/12 xl:w-96"
					/>
				</div>
				<div className="flex flex-col w-fit lg:w-10/12 2xl:w-full mb-5 bg-slate-300 bg-opacity-30 p-6 xl:p-12 border border-slate-400 rounded-md shadow-lg shadow-slate-500">
					<h3 className="text-3xl lg:text-4xl font-cinzel ml-4 py-3 lg:pb-6">
						Italian Cuisine on Koh Toa Island
					</h3>
					<p className="w-full text-sans text-lg ld:text-xl text-forth tracking-wide lg:tracking-wider font-montserrat">
						At Porto Bello, we are the number one Koh Tao restaurant
						to offer quality Italian and Mediterranean cuisine.
						Porto Bello has a wide selection of beers, wines, and
						original cocktails. Our menu features delicious dishes
						that everyone will love. From classic pizza and pasta
						dishes to fresh salads, delicious starters and main
						dishes. At Porto Bello, we take our role seriously as
						Koh Tao’s number one Italian dining experience. Whether
						you are a local or a visitor on Koh Tao Island, our
						Italian restaurant is the perfect place to enjoy a tasty
						meal. Come to Porto Bello and discover why we are the
						best spot for Italian cuisine on Koh Tao Thailand.
					</p>
				</div>
			</div>
		</article>
	);
};

export default AboutUs;
