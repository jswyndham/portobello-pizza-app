import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MenuToggle from './MenuToogle';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { CiPizza } from 'react-icons/ci';
import { LiaCocktailSolid } from 'react-icons/lia';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import SocialMediaLinks from '../SocialMediaLinks';
import logo from '/images/portobello-no-background-small-2.png';
import LogoutButton from '../logout/LogoutButton';
import { useAuth } from '../../context/AuthContext';

const sidebarVariants = {
	open: { x: 0 },
	closed: { x: '100%' },
};

const backdropVariants = {
	open: { opacity: 1, display: 'block' },
	closed: { opacity: 0, transitionEnd: { display: 'none' } },
};

const SidebarMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { state } = useAuth();
	const { isLoggedIn } = state;

	const toggleSidebar = () => setIsOpen(!isOpen);

	useEffect(() => {
		if (!isLoggedIn) {
			setIsOpen(false);
		}
	}, [isLoggedIn]);

	return (
		<>
			<div className="fixed z-50 top-0 right-0">
				<MenuToggle toggle={toggleSidebar} isOpen={isOpen} />
			</div>

			{/* Close sidebar when backdrop is clicked */}
			<motion.div
				className="fixed z-20 top-0 left-0 w-full h-full bg-black bg-opacity-70"
				initial="closed"
				style={{ opacity: 1 }}
				animate={isOpen ? 'open' : 'closed'}
				variants={backdropVariants}
				onClick={toggleSidebar}
			/>

			<motion.nav
				className="fixed z-40 top-0 right-0 bottom-0 w-9/12 sm:w-6/12 md:w-5/12 bg-forth text-white border-l-2 border-third lg:hidden"
				style={{ opacity: 1 }}
				initial="closed"
				animate={isOpen ? 'open' : 'closed'}
				variants={sidebarVariants}
				transition={{
					type: 'spring',
					stiffness: 175,
					damping: 20,
					when: 'beforeChildren',
					staggerChildren: 0.3,
				}}
			>
				{/* Logo */}

				<motion.img
					src={logo}
					alt="Main Logo"
					initial={{ opacity: 0 }}
					style={{ opacity: 0 }}
					animate={{ opacity: isOpen ? 1 : 0 }}
					exit={{ opacity: 0 }}
					className="h-9 w-32 m-5"
					transition={{ duration: 1, delay: 0.3 }} // Adding delay to ensure the sidebar animation completes
				/>

				<div className="w-60 flex font-semibold text-yellow-400 text-2xl pt-3 pl-5">
					Tel: +66 77 457 029
				</div>

				{/* Unordered list of links */}
				<ul className="flex flex-col w-fit text-2xl pl-4 pt-2 font-robotoSlab">
					<Link to="/">
						<li
							className="flex flex-row py-8 w-fit transition-all active:text-secondary hover:cursor-pointer hover:text-secondary"
							onClick={toggleSidebar}
						>
							<div className="mt-0.5 pr-4">
								<IoHomeOutline />
							</div>
							HOME
						</li>
					</Link>

					<Link to="/foodmenu">
						<li
							className="flex flex-row w-fit py-8 relative transition-all active:text-secondary hover:cursor-pointer hover:text-secondary"
							onClick={toggleSidebar}
						>
							<div className="mt-0.5 pr-4">
								<CiPizza />
							</div>
							FOOD MENU
						</li>
					</Link>

					<Link to="/drinksmenu">
						<li
							className="flex flex-row w-fit py-8 relative transition-all active:text-secondary  hover:cursor-pointer hover:text-secondary"
							onClick={toggleSidebar}
						>
							<div className="mt-0.5 pr-4">
								<LiaCocktailSolid />
							</div>
							DRINKS MENU
						</li>
					</Link>

					{/* Conditionally render ADMIN link if logged in */}
					{isLoggedIn && (
						<Link to="/addmenu">
							<li
								className="flex flex-row w-fit py-8 relative transition-all active:text-secondary  hover:cursor-pointer hover:text-secondary"
								onClick={toggleSidebar}
							>
								<div className="mt-0.5 pr-4">
									<MdOutlineAdminPanelSettings />
								</div>
								ADD MENU
							</li>
						</Link>
					)}
				</ul>

				{/* Conditionally render Logout button if logged in */}
				{isLoggedIn && (
					<div className="flex justify-items-start mb-6 ml-6">
						<LogoutButton />
					</div>
				)}
				<div className="h-4 pl-8 hover:text-primary active:text-secondary">
					<SocialMediaLinks />
				</div>
			</motion.nav>
		</>
	);
};

export default SidebarMenu;
