import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { CiPizza } from 'react-icons/ci';
import { LiaCocktailSolid } from 'react-icons/lia';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { LuMapPin } from 'react-icons/lu';
import SocialMediaLinks from '../SocialMediaLinks';
import logo from '/images/portobello-no-background-small-2.png';
import LogoutButton from '../logout/LogoutButton';
import { useAuth } from '../../context/AuthContext';
import MenuToggle from './MenuToogle';

const sidebarVariants = {
	open: { x: 0 },
	closed: { x: '100%' },
};

const backdropVariants = {
	open: { opacity: 1, display: 'block' },
	closed: { opacity: 0, transitionEnd: { display: 'none' } },
};

const menuVariants = {
	open: { opacity: 1, y: 0, display: 'block' },
	closed: { opacity: 0, y: -20, transitionEnd: { display: 'none' } },
};

const SidebarMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { state } = useAuth();
	const { isLoggedIn } = state;

	const [isFoodMenuOpen, setIsFoodMenuOpen] = useState<boolean>(false);
	const [isAdminList, setIsAdminList] = useState<boolean>(false);

	const adminButtonRef = useRef<HTMLLIElement>(null);
	const foodMenuButtonRef = useRef<HTMLLIElement>(null);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const toggleSidebar = () => setIsOpen(!isOpen);

	useEffect(() => {
		if (!isLoggedIn) {
			setIsOpen(false);
		}
	}, [isLoggedIn]);

	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (
				!foodMenuButtonRef.current?.contains(e.target) &&
				!adminButtonRef.current?.contains(e.target) &&
				!sidebarRef.current?.contains(e.target)
			) {
				setIsFoodMenuOpen(false);
				setIsAdminList(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleFoodMenuToggle = (e: any) => {
		e.stopPropagation();
		setIsFoodMenuOpen((prev) => !prev);
		setIsAdminList(false);
	};

	const handleAdminMenuToggle = (e: any) => {
		e.stopPropagation();
		setIsAdminList((prev) => !prev);
		setIsFoodMenuOpen(false);
	};

	const handleMenuItemClick = () => {
		setIsFoodMenuOpen(false);
		setIsAdminList(false);
		setIsOpen(false);
	};

	return (
		<>
			<article className="fixed z-50 top-0 right-0">
				<MenuToggle toggle={toggleSidebar} isOpen={isOpen} />
			</article>

			{/* Close sidebar when backdrop is clicked */}
			<motion.article
				className="fixed z-20 top-0 left-0 w-full h-full bg-black bg-opacity-85 backdrop-blur-sm"
				initial="closed"
				style={{ opacity: 1 }}
				animate={isOpen ? 'open' : 'closed'}
				variants={backdropVariants}
				onClick={toggleSidebar}
			/>

			<motion.nav
				ref={sidebarRef}
				className="fixed z-40 top-0 right-0 bottom-0 w-8/12 sm:w-6/12 md:w-5/12 pt-6 text-white xl:hidden overflow-y-auto"
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
					transition={{ duration: 1, delay: 0.3 }}
				/>

				<div className="w-60 flex font-semibold text-yellow-400 text-2xl pt-12 pl-5">
					Tel: +66 77 457 029
				</div>

				{/* Unordered list of links */}
				<ul className="flex flex-col w-fit text-xl pl-4 pt-10 font-robotoSlab">
					<Link to="/">
						<li
							className="flex flex-row py-8 w-fit transition-all active:text-yellow-500 active:ml-0 hover:cursor-pointer hover:text-yellow-400 hover:-ml-3"
							onClick={toggleSidebar}
						>
							<div className="mt-0.5 pr-4">
								<IoHomeOutline />
							</div>
							HOME
						</li>
					</Link>

					<>
						<li
							className="relative group w-52 py-4 flex flex-row transition-all duration-500 hover:text-yellow-300 hover:cursor-pointer active:text-yellow-600"
							onClick={handleFoodMenuToggle}
							ref={foodMenuButtonRef}
						>
							<div className="mt-0.5 pr-4">
								<CiPizza />
							</div>
							<div className="mr-2">FOOD MENU</div>

							<AnimatePresence mode="wait">
								{isFoodMenuOpen ? (
									<motion.div
										key="down-arrow"
										initial={{ opacity: 0 }}
										style={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
									>
										<IoMdArrowDropdown className="text-2xl mt-1 ml-2" />
									</motion.div>
								) : (
									<motion.div
										key="up-arrow"
										initial={{ opacity: 0 }}
										style={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
									>
										<IoMdArrowDropup className="text-2xl mt-1 ml-2" />
									</motion.div>
								)}
							</AnimatePresence>
						</li>

						<AnimatePresence>
							{isFoodMenuOpen && (
								<motion.div
									className="w-48 mt-2 bg-forth bg-opacity-40 rounded-b-md shadow-lg"
									initial="closed"
									style={{ opacity: 0 }}
									animate="open"
									exit="closed"
									variants={menuVariants}
								>
									<ul className="w-full flex flex-col py-4 justify-end items-center">
										<Link to="/pizza">
											<li
												onClick={handleMenuItemClick}
												className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
											>
												Pizza
											</li>
										</Link>
										<Link to="/pasta">
											<li
												onClick={handleMenuItemClick}
												className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
											>
												Pasta
											</li>
										</Link>
										<Link to="/calzone">
											<li
												onClick={handleMenuItemClick}
												className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
											>
												Calzone
											</li>
										</Link>
										<Link to="/starter">
											<li
												onClick={handleMenuItemClick}
												className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
											>
												Starters
											</li>
										</Link>
										<Link to="/mains">
											<li
												onClick={handleMenuItemClick}
												className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
											>
												Mains
											</li>
										</Link>
										<Link to="/sides">
											<li
												onClick={handleMenuItemClick}
												className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
											>
												Sides
											</li>
										</Link>
										<Link to="/salad">
											<li
												onClick={handleMenuItemClick}
												className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
											>
												Salad
											</li>
										</Link>
										<Link to="/dessert">
											<li
												onClick={handleMenuItemClick}
												className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
											>
												Dessert
											</li>
										</Link>
									</ul>
								</motion.div>
							)}
						</AnimatePresence>
					</>

					<Link to="/drinksmenu">
						<li
							className="flex flex-row py-8 w-fit transition-all active:text-yellow-500 active:ml-0 hover:cursor-pointer hover:text-yellow-400 hover:-ml-3"
							onClick={toggleSidebar}
						>
							<div className="mt-0.5 pr-4">
								<LiaCocktailSolid />
							</div>
							DRINKS MENU
						</li>
					</Link>

					<Link to="/contact">
						<li
							className="flex flex-row py-8 w-fit transition-all active:text-yellow-500 active:ml-0 hover:cursor-pointer hover:text-yellow-400 hover:-ml-3"
							onClick={toggleSidebar}
						>
							<div className="mt-0.5 pr-4">
								<LuMapPin />
							</div>
							CONTACT
						</li>
					</Link>

					{/* Conditionally render ADMIN link if logged in */}
					{isLoggedIn && (
						<>
							<li
								className="flex flex-row py-8 w-fit transition-all active:text-yellow-500 active:ml-0 hover:cursor-pointer hover:text-yellow-400 hover:-ml-3"
								onClick={handleAdminMenuToggle}
								ref={adminButtonRef}
							>
								<div className="mt-0.5 pr-4">
									<MdOutlineAdminPanelSettings />
								</div>
								ADMIN
								<AnimatePresence mode="wait">
									{isAdminList ? (
										<motion.div
											key="down-arrow"
											initial={{ opacity: 0 }}
											style={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.3 }}
										>
											<IoMdArrowDropdown className="text-2xl mt-1 ml-2" />
										</motion.div>
									) : (
										<motion.div
											key="up-arrow"
											initial={{ opacity: 0 }}
											style={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.3 }}
										>
											<IoMdArrowDropup className="text-2xl mt-1 ml-2" />
										</motion.div>
									)}
								</AnimatePresence>
							</li>

							<AnimatePresence>
								{isAdminList && (
									<motion.div
										className="w-60"
										initial="closed"
										style={{ opacity: 0 }}
										animate="open"
										exit="closed"
										variants={menuVariants}
									>
										<ul className="w-52 flex flex-col py-4 justify-start">
											<Link to="/admin/addmenu">
												<li
													onClick={toggleSidebar}
													className="px-6 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
												>
													ADD MENU
												</li>
											</Link>
											<Link to="/admin/members">
												<li
													onClick={toggleSidebar}
													className="px-6 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
												>
													MEMBERS
												</li>
											</Link>
											<Link to="/admin/register">
												<li
													onClick={toggleSidebar}
													className="px-6 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
												>
													REGISTER
												</li>
											</Link>
										</ul>
										<div className="w-full flex justify-start ml-4 pt-4">
											<LogoutButton />
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</>
					)}
				</ul>

				<motion.div
					initial={{ y: 0 }}
					animate={{ y: isAdminList ? 80 : 0 }}
					transition={{ type: 'spring', stiffness: 350, damping: 15 }}
					className="h-4 pt-6 pl-8 hover:text-primary active:text-secondary"
				>
					<SocialMediaLinks />
				</motion.div>
			</motion.nav>
		</>
	);
};

export default SidebarMenu;
