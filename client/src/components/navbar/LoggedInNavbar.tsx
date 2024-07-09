import { Link } from 'react-router-dom';
import logo from '/images/portobello-no-background-small-2.png';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import LogoutButton from '../logout/LogoutButton';

const Navbar = () => {
	return (
		<nav className="hidden lg:flex items-center absolute z-20 w-screen h-28 bg-forth bg-opacity-70 justify-end py-14 lg:py-10 md:px-6">
			<div className="relative w-full flex items-center justify-start 2xl:justify-center ml-6 2xl:ml-96">
				<Link to="/">
					<img
						src={logo}
						alt="Portobello, Koh Tao logo"
						className="h-16 my-auto"
					/>
				</Link>
			</div>
			<div className="flex flex-col items-end font-robotoSlab ">
				<div className="w-60 flex font-semibold text-yellow-400 pb-2 text-xl xl:text-2xl">
					Tel: +66 77 457 029
				</div>
				<ul className="w-fit text-white flex flex-row lg:gap-10 2xl:gap-16 justify-around md:justify-between items-center md:text-lg lg:text-xl">
					<Link to="/">
						<li className="w-24 li-hover relative inline-block transition-all duration-500 hover:text-yellow-300 hover:cursor-pointer">
							HOME
						</li>
					</Link>

					<Link to="/foodmenu">
						<li className="w-36 li-hover relative inline-block transition-all duration-500 hover:text-yellow-300 hover:cursor-pointer">
							FOOD MENU
						</li>
					</Link>

					<Link to="/drinksmenu">
						<li className="li-hover relative inline-block transition-all w-36 duration-500 hover:text-yellow-300 hover:cursor-pointer">
							DRINKS MENU
						</li>
					</Link>

					<Link to="/addmenu">
						<li className="flex flex-row w-fit py-8 relative transition-all active:text-secondary  hover:cursor-pointer hover:text-secondary">
							<div className="mt-0.5 pr-4">
								<MdOutlineAdminPanelSettings />
							</div>
							ADD MENU
						</li>
					</Link>
				</ul>

				<div className="flex justify-items-start mb-6 ml-6">
					<LogoutButton />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
