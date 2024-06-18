import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '/images/portobello-logo-square.png';
import homeImage from '/images/pizza-eneida-nieves.jpg';
// import ImageCarousel from '../components/homePage/ImageCarousel';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import HomeJSONLD from '../components/seo/HomeJSONLD';

const Home = () => {
	const ref = useRef(null);
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
			opens: '19:00',
			closes: '05:00',
		},
	];

	return (
		<>
			<motion.article className="relative overflow-hidden w-screen h-full bg-red-700 my-12 md:m-auto">
				{/* Serverside SEO using react-helmet-async */}
				<Helmet>
					<title>Portobello - Best Koh Tao Pizza</title>

					{/* Metadata description */}
					<meta
						name="description"
						content="Experience the best of Kyoto nightlife at Rock Bar ING. Enjoy rock music, expertly crafted drinks, and a vibrant atmosphere on Kiyamachi Street."
					/>

					{/* Canonical tag */}
					<link rel="canonical" href="" />

					{/* Social Media tags */}
					<meta property="og:type" content="website" />
					<meta
						property="og:title"
						content="Portobello - Koh Tao Pizza"
					/>
					<meta
						property="og:description"
						content="Experience the best of Kyoto nightlife at Rock Bar ING. Enjoy live rock music, expertly crafted drinks, and a vibrant atmosphere on Kiyamachi Street."
					/>
					{/* Twitter tags */}
					<meta
						property="og:url"
						content="http://www.portobello.com/"
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

				{/* Json-Ld data for extra SEO structure */}
				<HomeJSONLD
					name="Portobello, Koh Tao"
					address={{
						streetAddress:
							'Sai Ree Road, Ban Ko Tao, Thailand, Surat Thani',
						imagePath: '../images/logo-main.png',
					}}
					telephone="+66 77 457 029"
					url="http://www.portobello.com/"
					openingHours={openingHours}
				/>

				{/* ING logo */}
				<motion.img
					src={logo}
					ref={ref}
					alt="Main Logo"
					variants={logoVariants}
					initial="hidden"
					animate={animationTriggered ? 'visible' : 'hidden'}
					className="absolute inset-0 mx-auto w-8/12 md:max-w-3xl pt-6 md:pt-20 z-10"
				/>

				<motion.img
					src={homeImage}
					alt="Background"
					initial="hidden"
					animate={animationTriggered ? 'visible' : 'hidden'}
					variants={logoBackgroundVariants}
					className="w-full h-auto"
				/>

				<motion.div
					initial="hidden"
					animate={animationTriggered ? 'visible' : 'hidden'}
					variants={contentFadeInVariants}
					className="relative mt-6 lg:mt-[-40px] xl:mt-[-60px] 2xl:mt-[-275px] 3xl:mt-[-550px] 4xl:mt-[-650px] 5xl:mt-[-875px] z-10"
				>
					<Footer />
				</motion.div>
			</motion.article>
		</>
	);
};

export default Home;
