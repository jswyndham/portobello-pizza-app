import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AccessJSONLD from '../components/seo/AccessJSONLD';
import { HeadingOne } from '../components';
import Map from '../components/access/Map';

const Contact = () => {
	const [animationTriggered, setAnimationTriggered] = useState(false);

	const src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.0010644708386!2d99.82648097503244!3d10.098997590011507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3054f1b9b0a1ec91%3A0x97c8e43d79e050aa!2sPortobello%20Restaurant%2C%20Koh%20Tao!5e0!3m2!1sen!2sjp!4v1722062183431!5m2!1sen!2sjp`;

	useEffect(() => {
		setAnimationTriggered(true);
	}, []);

	return (
		<>
			<Helmet>
				<title>Contact Us - Portobello, Koh Tao</title>
				<meta
					name="description"
					content="Contact Portobello, the best Koh Tao restaurant for Italian and Mediterranean cuisine. Find our location, contact information, and opening hours."
				/>
				<link
					rel="canonical"
					href="https://www.portobello.com/contact"
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="Contact Us - Portobello, Koh Tao"
				/>
				<meta
					property="og:description"
					content="Contact Portobello, the best Koh Tao restaurant for Italian and Mediterranean cuisine. Find our location, contact information, and opening hours."
				/>
				<meta
					property="og:url"
					content="https://www.portobello.com/contact"
				/>
				<meta
					property="og:image"
					content="./images/portobello-logo-round-black.png"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="Contact Us - Portobello, Koh Tao"
				/>
				<meta
					name="twitter:description"
					content="Contact Portobello, the best Koh Tao restaurant for Italian and Mediterranean cuisine. Find our location, contact information, and opening hours on Koh Tao Island."
				/>
			</Helmet>

			{/* JSON-LD - SEO */}
			<AccessJSONLD
				name="Portobello, Koh Tao"
				address={{
					streetAddress:
						'Sai Ree Road, Ban Koh Tao, Thailand, Surat Thani',
					imagePath: '/images/portobello-logo-round-black.png',
				}}
				telephone="+66 77 457 029"
				url="https://www.portobello.com/"
				latitude="10.099187716862039"
				longitude="99.82905053111142"
			/>

			<article className="bg-main-gradient-two min-h-screen">
				<article className="flex justify-center flex-col h-full pt-16 xl:pt-28">
					<div className=" relative w-full flex flex-col">
						<HeadingOne headingOneText="Contact Us" />
						<figure className="flex justify-center inset-0 my-4">
							<img
								src="/images/portobello-shop-front-short.jpg"
								alt="Porto Bello Restaurant front"
							/>
						</figure>
						<article className="absolute -bottom-60 sm:-bottom-48 lg:-bottom-60 xl:-bottom-44 2xl:-bottom-40 w-full flex justify-center">
							<div className="w-full xl:w-10/12 2xl:max-w-7xl grid grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 text-black text-lg font-semibold lg:text-2xl text-center">
								<div className="bg-slate-200 p-2 ml-4 xl:ml-0 lg:p-6 xl:p-10 rounded-2xl drop-shadow-2xl shadow-xl shadow-slate-700 border-2 lg:border-4 border-primary">
									<p className="mt-4 smx:mt-10 xl:mt-5">
										Visit us at Sai Ree Road, Ban Koh Tao,
										Thailand, Surat Thani.
									</p>
								</div>
								<div className="flex flex-col justify-center bg-slate-200 p-2 lg:p-6 rounded-2xl drop-shadow-2xl shadow-xl shadow-slate-700 border-2 lg:border-4 border-primary">
									<p>Call us at </p>
									<p className="text-primary">
										+66 77 457 029
									</p>
									<p className="py-2">OR</p>
									<p>
										email us at{' '}
										<span className="text-primary">
											info@portobello.com
										</span>{' '}
									</p>
								</div>
								<div className="col-span-3 xl:col-span-1 bg-slate-200 px-2 py-6 xl:p-10  mx-4 xl:mx-0 lg:p-6 rounded-2xl drop-shadow-2xl shadow-xl shadow-slate-700 border-2 lg:border-4 border-primary">
									<p className="xl:mt-8">
										We are open daily from 4:00pm to
										10:30pm.
									</p>
								</div>
							</div>
						</article>
					</div>
				</article>
				<article className="w-full h-svh mt-72 p-1 flex justify-center">
					<div className="w-full h-4/5 lg:h-3/5 lg:w-4/5 2xl:w-3/5 flex justify-center">
						<Map src={src} />
					</div>
				</article>
			</article>
		</>
	);
};

export default Contact;
