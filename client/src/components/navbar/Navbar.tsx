import { Link } from 'react-router-dom';
import logo from '/images/portobello-no-background-small-2.png';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../logout/LogoutButton';

const Navbar = () => {
	const { state } = useAuth();
	const { isLoggedIn } = state;

	return (
		<nav className="hidden lg:flex items-center absolute z-20 w-screen h-28 bg-forth bg-opacity-70 justify-end py-14 lg:py-10 md:px-6">
			<div className="relative w-full flex items-center justify-start ml-6">
				<Link to="/">
					<img
						src={logo}
						alt="Portobello, Koh Tao logo"
						className="h-16 my-auto"
					/>
				</Link>
			</div>
			<div className="flex flex-col items-end font-robotoSlab ">
				{isLoggedIn ? (
					<div className="hidden">Tel: +66 77 457 029</div>
				) : (
					<div className="w-60 flex font-semibold text-yellow-400 pb-3 text-xl xl:text-2xl">
						Tel: +66 77 457 029
					</div>
				)}

				<div className="flex flex-row">
					<ul className="w-fit text-white flex flex-row gap-8 xl:gap-20 justify-around md:justify-between items-center md:text-lg lg:text-xl">
						<Link to="/">
							<li className="w-20 li-hover relative inline-block transition-all duration-500 hover:text-yellow-300 hover:cursor-pointer active:text-yellow-600">
								HOME
							</li>
						</Link>

						<Link to="/foodmenu">
							<li className="xl:w-36 w-28 li-hover relative inline-block transition-all duration-500 hover:text-yellow-300 hover:cursor-pointer active:text-yellow-600">
								FOOD MENU
							</li>
						</Link>

						<Link to="/drinksmenu">
							<li className="li-hover relative inline-block transition-all xl:w-36 w-28 duration-500 hover:text-yellow-300 hover:cursor-pointer mr-3 active:text-yellow-600">
								DRINKS MENU
							</li>
						</Link>

						{/* Conditionally render ADMIN link if logged in */}
						{isLoggedIn && (
							<Link to="/addmenu">
								<li className="flex flex-row xl:w-36 w-24 py-8 relative transition-all active:text-secondary  hover:cursor-pointer hover:text-yellow-300">
									ADD MENU
								</li>
							</Link>
						)}
					</ul>
					{/* Conditionally render Logout button if logged in */}
					{isLoggedIn && (
						<div className="flex justify-items-start ml-3 mt-9 xl:mt-5">
							<LogoutButton />
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
