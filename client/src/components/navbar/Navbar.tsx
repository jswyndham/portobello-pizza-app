import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/images/portobello-no-background-small-2.png';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../logout/LogoutButton';
import { AnimatePresence, motion } from 'framer-motion';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const Navbar = () => {
	const { state } = useAuth();
	const { isLoggedIn } = state;

	const foodMenuRef = useRef<any>(null);
	const adminMenuRef = useRef<any>(null);
	const foodMenuButtonRef = useRef<any>(null);
	const adminButtonRef = useRef<any>(null);

	const [isFoodMenuOpen, setIsFoodMenuOpen] = useState<boolean>(false);
	const [isAdminMenuOpen, setIsAdminMenuOpen] = useState<boolean>(false);

	// Click outside the card menu to close
	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (
				foodMenuRef.current &&
				!foodMenuRef.current.contains(e.target) &&
				foodMenuButtonRef.current &&
				!foodMenuButtonRef.current.contains(e.target)
			) {
				setIsFoodMenuOpen(false);
			}
			if (
				adminMenuRef.current &&
				!adminMenuRef.current.contains(e.target) &&
				adminButtonRef.current &&
				!adminButtonRef.current.contains(e.target)
			) {
				setIsAdminMenuOpen(false);
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
		setIsAdminMenuOpen(false); // Close the admin menu if open
	};

	const handleAdminMenuToggle = (e: any) => {
		e.stopPropagation();
		setIsAdminMenuOpen((prev) => !prev);
		setIsFoodMenuOpen(false); // Close the food menu if open
	};

	const handleMenuItemClick = () => {
		setIsFoodMenuOpen(false);
		setIsAdminMenuOpen(false);
	};

	// motion settings
	const menuVariants = {
		open: {
			maxHeight: 2000,
			opacity: 1,
			transition: {
				maxHeight: {
					duration: 0.8,
					ease: 'linear',
				},
				opacity: {
					duration: 0.9,
					ease: 'linear',
				},
			},
		},
		closed: {
			maxHeight: 0,
			opacity: 0,
			transition: {
				maxHeight: {
					duration: 0.3,
					ease: 'linear',
				},
				opacity: {
					duration: 0.4,
					ease: 'linear',
				},
			},
		},
	};

	return (
		<nav className="hidden xl:flex items-center fixed z-20 w-screen h-28 bg-forth bg-opacity-75 justify-end py-14 lg:py-10 md:px-6 backdrop-blur-sm">
			<div className="relative w-full flex items-center justify-start ml-6">
				<Link to="/">
					<img
						src={logo}
						alt="Portobello, Koh Tao logo"
						className="h-16 my-auto"
					/>
				</Link>
			</div>
			<div className="flex flex-col items-end font-robotoSlab">
				{isLoggedIn ? (
					<div className="hidden">Tel: +66 77 457 029</div>
				) : (
					<div className="w-60 flex font-semibold text-yellow-400 pb-3 text-xl xl:text-2xl">
						Tel: +66 77 457 029
					</div>
				)}

				<div className="flex flex-row">
					<ul className="w-fit text-white flex flex-row gap-8 2xl:gap-24 justify-around md:justify-between items-center md:text-lg lg:text-xl">
						<Link to="/">
							<li className="w-20 li-hover relative inline-block transition-all duration-500 hover:text-yellow-300 hover:cursor-pointer active:text-yellow-600">
								HOME
							</li>
						</Link>

						<>
							<li
								className="relative group w-40 flex flex-row transition-all duration-500 hover:text-yellow-300 hover:cursor-pointer active:text-yellow-600"
								onClick={handleFoodMenuToggle}
								ref={foodMenuButtonRef}
							>
								FOOD MENU
								<AnimatePresence mode="wait">
									{isFoodMenuOpen ? (
										<motion.div
											key="down-arrow"
											initial={{ opacity: 0 }}
											style={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.2 }}
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
											transition={{ duration: 0.2 }}
										>
											<IoMdArrowDropup className="text-2xl mt-1 ml-2" />
										</motion.div>
									)}
								</AnimatePresence>
							</li>

							<AnimatePresence>
								{isFoodMenuOpen && (
									<motion.div
										className={`absolute w-48 2xl:w-60 ${
											isLoggedIn
												? 'mr-52 2xl:mr-96'
												: 'mr-16 2xl:mr-44'
										} top-28 right-80 bg-forth bg-opacity-75 rounded-b-md shadow-lg backdrop-blur-sm`}
										ref={foodMenuRef}
										initial="closed"
										style={{ opacity: 0 }}
										animate="open"
										exit="closed"
										variants={menuVariants}
									>
										<ul className="w-full flex flex-col py-4 justify-end items-center">
											<Link to="/pizza">
												<li
													onClick={
														handleMenuItemClick
													}
													className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
												>
													Pizza
												</li>
											</Link>
											<Link to="/pasta">
												<li
													onClick={
														handleMenuItemClick
													}
													className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
												>
													Pasta
												</li>
											</Link>
											<Link to="/calzone">
												<li
													onClick={
														handleMenuItemClick
													}
													className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
												>
													Calzone
												</li>
											</Link>
											<Link to="/starter">
												<li
													onClick={
														handleMenuItemClick
													}
													className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
												>
													Starters
												</li>
											</Link>
											<Link to="/mains">
												<li
													onClick={
														handleMenuItemClick
													}
													className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
												>
													Mains
												</li>
											</Link>
											<Link to="/sides">
												<li
													onClick={
														handleMenuItemClick
													}
													className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
												>
													Sides
												</li>
											</Link>
											<Link to="/salad">
												<li
													onClick={
														handleMenuItemClick
													}
													className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
												>
													Salad
												</li>
											</Link>
											<Link to="/dessert">
												<li
													onClick={
														handleMenuItemClick
													}
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
							<li className="li-hover relative inline-block transition-all xl:w-36 w-28 duration-500 hover:text-yellow-300 hover:cursor-pointer mr-3 active:text-yellow-600">
								DRINKS MENU
							</li>
						</Link>

						<Link to="/contact">
							<li className="xl:w-36 w-28 li-hover relative inline-block transition-all duration-500 hover:text-yellow-300 hover:cursor-pointer active:text-yellow-600">
								CONTACT
							</li>
						</Link>

						{/* Conditionally render ADMIN link if logged in */}
						{isLoggedIn && (
							<>
								<li
									className="relative group flex flex-row transition-all duration-500 hover:text-yellow-300 hover:cursor-pointer active:text-yellow-600 mr-6"
									onClick={handleAdminMenuToggle}
									ref={adminButtonRef}
								>
									ADMIN
									<AnimatePresence mode="wait">
										{isAdminMenuOpen ? (
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
									{isAdminMenuOpen && (
										<motion.div
											className="absolute w-60 top-28 right-0 bg-forth bg-opacity-75 backdrop-blur-sm rounded-b-md shadow-lg"
											ref={adminMenuRef}
											initial="closed"
											style={{ opacity: 0 }}
											animate="open"
											exit="closed"
											variants={menuVariants}
										>
											<ul className="w-full flex flex-col py-4 justify-end items-center">
												<Link to="/admin/addmenu">
													<li
														onClick={
															handleMenuItemClick
														}
														className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
													>
														ADD MENU
													</li>
												</Link>
												<Link to="/admin/members">
													<li
														onClick={
															handleMenuItemClick
														}
														className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
													>
														MEMBERS
													</li>
												</Link>
												<Link to="/admin/register">
													<li
														onClick={
															handleMenuItemClick
														}
														className="px-14 py-2 my-3 text-white hover:bg-gray-600 hover:text-yellow-300 transition-all duration-300"
													>
														REGISTER
													</li>
												</Link>
											</ul>
											<div className="pb-10 pt-4 mr-16 ">
												<LogoutButton />
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
