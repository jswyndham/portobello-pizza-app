import { useState } from 'react';
import { motion } from 'framer-motion';
import MenuToggle from './MenuToogle';
import { Link } from 'react-router-dom';
import { RiBeerFill } from 'react-icons/ri';
import { PiBowlFoodFill } from 'react-icons/pi';
import { FaMapMarkedAlt } from 'react-icons/fa';
import ingOnlyLogo from '/images/logo-ing-only-white.png';

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

	const toggleSidebar = () => setIsOpen(!isOpen);

	return (
		<>
			<div className="relative">
				<MenuToggle toggle={toggleSidebar} isOpen={isOpen} />
			</div>
			<motion.div
				className="fixed z-20 top-0 left-0 w-full h-full bg-black bg-opacity-70"
				initial="closed"
				style={{ opacity: 1 }}
				animate={isOpen ? 'open' : 'closed'}
				variants={backdropVariants}
				onClick={toggleSidebar} // Close sidebar when backdrop is clicked
			/>
			<motion.nav
				className="fixed z-50 top-0 right-0 bottom-0 w-11/12 bg-slate-950 text-white border-l-2 border-slate-700  md:hidden"
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
					src={ingOnlyLogo}
					alt="Main Logo"
					initial={{ opacity: 0 }}
					style={{ opacity: 0 }}
					animate={{ opacity: isOpen ? 1 : 0 }}
					exit={{ opacity: 0 }}
					className="h-9 w-16 m-5 shadow-[0_10px_60px_-15px_rgba(0,0,0,0.1)] shadow-slate-400"
					transition={{ duration: 1, delay: 0.3 }} // Adding delay to ensure the sidebar animation completes
				/>

				{/* Unordered list of links */}
				<ul className="flex flex-col text-2xl pl-4 py-4 font-robotoSlab">
					<Link to="/">
						<li
							className="flex flex-row py-8 transition-all active:text-red-500 hover:cursor-pointer"
							onClick={toggleSidebar}
						>
							<div className="mt-0.5 pr-4">
								<RiBeerFill />
							</div>
							<span className="">ING BAR | イング居酒屋</span>
						</li>
					</Link>

					<Link to="/menu">
						<li
							className="flex flex-row py-8 relative transition-all active:text-red-500  hover:cursor-pointer"
							onClick={toggleSidebar}
						>
							<div className="mt-0.5 pr-4">
								<PiBowlFoodFill />
							</div>
							<span className="">MENU | メニュー</span>
						</li>
					</Link>

					<Link to="/access">
						<li
							className="flex flex-row py-8 relative transition-all active:text-red-500  hover:cursor-pointer"
							onClick={toggleSidebar}
						>
							<div className="mt-0.5 pr-4">
								<FaMapMarkedAlt />
							</div>
							<span className="">ACCESS | アクセス</span>
						</li>
					</Link>
				</ul>
			</motion.nav>
		</>
	);
};

export default SidebarMenu;
