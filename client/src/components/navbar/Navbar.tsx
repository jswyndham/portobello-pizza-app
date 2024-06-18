import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="hidden md:flex w-full h-16 bg-black justify-center py-14 lg:py-10 md:px-6">
			<ul className="w-fit text-white text-sm sm:text-md md:text-lg lg:text-2xl font-robotoSlab flex flex-row justify-around md:justify-between items-center">
				<Link to="/">
					<li className="w-25 md:w-50 li-hover relative border-white border-r-2 inline-block transition-all duration-500 hover:text-red-500 hover:cursor-pointer">
						HOME PAGE
					</li>
				</Link>

				<Link to="/foodmenu">
					<li className="w-25 md:w-50 li-hover relative border-white border-r-2 inline-block transition-all duration-500 hover:text-red-500 hover:cursor-pointer">
						FOOD MENU
					</li>
				</Link>

				<Link to="/drinksmenu">
					<li className="li-hover relative border-white border-r-2 inline-block transition-all w-25 md:w-50 duration-500 hover:text-red-500 hover:cursor-pointer">
						DRINKS MENU
					</li>
				</Link>

				<Link to="/contact">
					<li className="li-hover relative inline-block transition-all duration-500 w-25 md:w-50 hover:text-red-500 hover:cursor-pointer">
						CONTACT
					</li>
				</Link>

				<Link to="/admin">
					<li className="li-hover relative inline-block transition-all duration-500 w-25 md:w-50 hover:text-red-500 hover:cursor-pointer">
						ADMIN
					</li>
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
