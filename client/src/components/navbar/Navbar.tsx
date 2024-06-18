import { Link } from "react-router-dom";
import logo from "/images/portobello-no-background-small-2.png";

const Navbar = () => {
  return (
    <nav className="hidden md:flex w-full h-16 bg-forth justify-end py-14 lg:py-10 md:px-6">
      <div className="w-full flex items-center justify-start ml-6">
        <Link to="/">
          <img
            src={logo}
            alt="Portobello, Koh Tao logo"
            className="h-10 my-auto"
          />
        </Link>
      </div>
      <ul className="w-fit text-white text-sm sm:text-md md:text-lg lg:text-xl font-robotoSlab flex flex-row lg:gap-4 justify-around md:justify-between items-center">
        <Link to="/">
          <li className="w-24 li-hover relative inline-block transition-all duration-500 hover:text-secondary hover:cursor-pointer">
            HOME
          </li>
        </Link>

        <Link to="/foodmenu">
          <li className="w-36 li-hover relative inline-block transition-all duration-500 hover:text-secondary hover:cursor-pointer">
            FOOD MENU
          </li>
        </Link>

        <Link to="/drinksmenu">
          <li className="li-hover relative inline-block transition-all w-36 duration-500 hover:text-secondary hover:cursor-pointer">
            DRINKS MENU
          </li>
        </Link>

        <Link to="/admin">
          <li className="li-hover relative inline-block transition-all duration-500 pr-6 hover:text-secondary hover:cursor-pointer">
            ADMIN
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
