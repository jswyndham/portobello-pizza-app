import { CiFacebook } from 'react-icons/ci';
import { PiInstagramLogoLight } from 'react-icons/pi';

const SocialMediaLinks = () => {
	return (
		<div className="flex flex-row gap-10 p-1">
			<div className="text-4xl text-white">
				<a
					href="https://www.instagram.com/portobellokohtao/"
					target="_blank"
					rel="noopener noreferrer"
					title="Follow us on Instagram"
					aria-label="Instagram"
					className="hover:text-pink-400"
				>
					<PiInstagramLogoLight />
				</a>
			</div>
			<div className="text-4xl text-white">
				<a
					href="https://www.facebook.com/portobellokohtao/"
					target="_blank"
					rel="noopener noreferrer"
					title="Follow us on Facebook"
					aria-label="Facebook"
					className="hover:text-blue-400"
				>
					<CiFacebook />
				</a>
			</div>
		</div>
	);
};

export default SocialMediaLinks;
