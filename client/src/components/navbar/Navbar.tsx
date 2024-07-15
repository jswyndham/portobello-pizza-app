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

	const menuRef = useRef<any>(null);
	const adminButtonRef = useRef<any>(null); // Had to add a ref for the "ADMIN" button and ensure correct management of click events. The stopPropagation method wasn't working as expected

	const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const [isAdminList, setIsAdminList] = useState<boolean>(false);

	// Click outside the card menu to close
	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(e.target) &&
				adminButtonRef.current &&
				!adminButtonRef.current.contains(e.target)
			) {
				console.log('Click outside detected, closing dropdown');
				setIsAdminList(false); // Handle arrow direction
				setDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuRef]);

	const toggleDropdown = (e: any) => {
		e.stopPropagation(); // Stop the click from propagating further
		setIsAdminList(!isAdminList); // Handle arrow direction
		setDropdownOpen((prevState) => !prevState);
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
		<nav className="hidden lg:flex items-center fixed z-20 w-screen h-28 bg-forth bg-opacity-70 justify-end py-14 lg:py-10 md:px-6 backdrop-blur-sm">
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
							<>
								<li
									className="relative group flex flex-row transition-all duration-500 hover:text-yellow-300 hover:cursor-pointer active:text-yellow-600 mr-6"
									onClick={toggleDropdown}
									ref={adminButtonRef}
								>
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
									{isDropdownOpen && (
										<motion.div
											className="absolute w-52 top-28 right-0 bg-forth bg-opacity-70 p-4 rounded-b-md shadow-lg"
											ref={menuRef}
											initial="closed"
											style={{ opacity: 0 }}
											animate="open"
											exit="closed"
											variants={menuVariants}
										>
											<ul className="flex flex-col py-2 justify-end items-center">
												<Link to="/admin/addmenu">
													<li className="px-4 py-3 text-white hover:bg-gray-600 transition-all duration-300">
														ADD MENU
													</li>
												</Link>
												<Link to="/admin/members">
													<li className="px-4 py-3 text-white hover:bg-gray-600 transition-all duration-300">
														MEMBERS
													</li>
												</Link>
												<Link to="/private/admin/register">
													<li className="px-4 py-3 text-white hover:bg-gray-600 transition-all duration-300">
														REGISTER
													</li>
												</Link>
											</ul>
											<div className="my-2 mr-4">
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
