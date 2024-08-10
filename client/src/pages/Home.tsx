import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '/images/portobello-logo-round-black.png';
import { Helmet } from 'react-helmet-async';
import HomeJSONLD from '../components/seo/HomeJSONLD';
import { HomeMidSection } from '../components/homePage';
import AboutUs from '../components/homePage/AboutUs';
import ImageCarousel from '../components/homePage/ImageCarousel';
import homeImageSmall from '/images/pizza-eneida-nieves.jpg';

const Home = () => {
	const ref = useRef<any>(null);
	const [animationTriggered, setAnimationTriggered] = useState(false);

	useEffect(() => {
		setAnimationTriggered(true);
	}, []);

	const logoVariants = {
		hidden: { opacity: 0, scale: 0.5 },
		visible: { opacity: 1, scale: 1.3, transition: { duration: 1 } },
	};

	const logoBackgroundVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delay: 0.5, duration: 1.5 } },
	};

	const contentFadeInVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delay: 1, duration: 2 } },
	};

	const openingHours = [
		{
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
			],
			opens: '16:00',
			closes: '22:30',
		},
	];

	return (
		<>
			<section className="relative overflow-hidden w-full h-auto bg-red-700 md:mx-auto">
				<Helmet>
					<title>Portobello - Best Koh Tao Pizza</title>
					<meta
						name="description"
						content="Experience the best of Kyoto nightlife at Rock Bar ING. Enjoy rock music, expertly crafted drinks, and a vibrant atmosphere on Kiyamachi Street."
					/>
					<link rel="canonical" href="" />
					<meta property="og:type" content="website" />
					<meta
						property="og:title"
						content="Portobello - Koh Tao Pizza"
					/>
					<meta
						property="og:description"
						content="Experience the best of Kyoto nightlife at Rock Bar ING. Enjoy live rock music, expertly crafted drinks, and a vibrant atmosphere on Kiyamachi Street."
					/>
					<meta
						property="og:url"
						content="http://www.portobellokohtao.com/"
					/>
					<meta
						property="og:image"
						content="./images/ing-white-logo-black-background.jpg"
					/>
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:title" content="Portobello, Koh Tao" />
					<meta
						name="twitter:description"
						content="Dive into Kyoto's rock scene with live music and great drinks at Rock Bar ING. Located in the heart of Kyoto's nightlife district on Kiyamachi Street."
					/>
				</Helmet>

				{/* JSONLD - SEO */}
				<HomeJSONLD
					name="Portobello, Koh Tao"
					address={{
						streetAddress:
							'Sai Ree Road, Ban Koh Tao, Thailand, Surat Thani',
						imagePath: '/images/portobello-logo-round-black.png',
					}}
					telephone="+66 77 457 029"
					url="https://www.portobellokohtao.com/"
					openingHours={openingHours}
					priceRange="$$"
					servesCuisine={['Italian', 'Mediterranean']}
				/>

				{/* LOGO */}
				<motion.img
					src={logo}
					ref={ref}
					alt="Main Logo"
					variants={logoVariants}
					initial="hidden"
					animate={animationTriggered ? 'visible' : 'hidden'}
					className="absolute inset-0 left-8 md:left-12 xl:left-20 2xl:left-32 top-0 md:top-6 lg:top-28 xl:top-32 2xl:top-48 w-3/12 max-w-xl lg:w-60 xl:w-2/12 pt-6 z-10"
				/>

				<motion.div
					initial="hidden"
					animate={animationTriggered ? 'visible' : 'hidden'}
					variants={logoBackgroundVariants}
					className="w-full h-44 sm:h-80 md:h-96 lg:hidden bg-parallax-sm bg-fixed bg-contain"
				/>

				<motion.img
					src={homeImageSmall}
					alt="Portobello homepage image"
					initial="hidden"
					animate={animationTriggered ? 'visible' : 'hidden'}
					variants={logoBackgroundVariants}
					style={{ willChange: 'transform, opacity' }}
					className="w-full hidden lg:flex -mt-1 animated-element"
				/>

				<section className="bg-main-gradient">
					{/* MENU CATEGORY CARDS */}
					<motion.article
						initial="hidden"
						animate={animationTriggered ? 'visible' : 'hidden'}
						variants={contentFadeInVariants}
					>
						<HomeMidSection />
					</motion.article>

					{/* ABOUT US COMPONENT */}
					<motion.article
						initial="hidden"
						animate={animationTriggered ? 'visible' : 'hidden'}
						variants={contentFadeInVariants}
						className="flex justify-center items-center"
					>
						<AboutUs />
					</motion.article>

					{/* IMAGE CAROUSEL */}
					<div className="flex justify-center items-center">
						<motion.article
							initial="hidden"
							animate={animationTriggered ? 'visible' : 'hidden'}
							variants={logoBackgroundVariants}
							className="w-full"
						>
							<ImageCarousel />
						</motion.article>
					</div>
				</section>
			</section>
		</>
	);
};

export default Home;
