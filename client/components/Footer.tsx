import { Link } from 'react-router-dom';
import logo from '/images/logo-footer.png';
import SocialMediaLinks from './homePage/SocialMediaLinks';

const Footer = () => {
	return (
		<>
			<footer className="w-screen h-fit bg-black border-t-2 border-t-slate-700 p-3 text-base-content">
				<div className="flex flex-col justify-center items-center">
					{/* Social Media */}
					<div className="my-4">
						<SocialMediaLinks />
					</div>

					{/* Contact Info */}
					<div className="flex flex-col md:flex-row md:ml-36 pb-3 justify-center items-center">
						<div className="mt-3 md:hidden">
							<Link href="/">
								<img
									src={logo}
									alt="Rock Bar ING white logo"
									className="h-20 md:h-28"
								/>
							</Link>
						</div>

						<div className="hidden md:block my-4">
							<Link href="/">
								<img
									src={logo}
									alt="Rock Bar ING white logo"
									className="h-28"
								/>
							</Link>
						</div>
						<div className="w-72 py-2">
							<h3 className="font-robotoSlab text-red-500 font-bold text-md">
								Visit Us
							</h3>
							<p className="text-sm md:text-md py-1">
								Open 7 days a week | 7pm - 5am
							</p>
							<p className="text-sm md:text-md py-1">
								〒604-8022 Kyoto, Nakagyo Ward,
								南車屋町２８８－２０１ 京都ロイヤルビル２階
							</p>
							<p className="text-sm md:text-md py-1">
								Tel / 電話: 075-255-5087
							</p>
						</div>
					</div>

					<div className="text-white text-sm md:text-md">
						<p>
							©2024 | All Rights Reserved | Powered by JSW Web Dev
						</p>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
