import React from 'react';
import { motion } from 'framer-motion';

const Path = (props) => (
	<motion.path
		fill="transparent"
		strokeWidth="3"
		stroke="white"
		strokeLinecap="round"
		{...props}
	/>
);

const MenuToggle = ({ toggle, isOpen }) => (
	<button onClick={toggle} className="menu-toggle block md:hidden p-4">
		{' '}
		{/* Ensures button is only visible below the md breakpoint */}
		<svg width="30" height="30" viewBox="0 0 23 23">
			<Path
				variants={{
					closed: { d: 'M 2 2.5 L 20 2.5' },
					open: { d: 'M 3 16.5 L 17 2.5' },
				}}
				animate={isOpen ? 'open' : 'closed'}
			/>
			<Path
				d="M 2 9.423 L 20 9.423"
				variants={{
					closed: { opacity: 1 },
					open: { opacity: 0 },
				}}
				initial="closed"
				animate={isOpen ? 'open' : 'closed'}
				transition={{ duration: 0.1 }}
			/>
			<Path
				variants={{
					closed: { d: 'M 2 16.346 L 20 16.346' },
					open: { d: 'M 3 2.5 L 17 16.346' },
				}}
				animate={isOpen ? 'open' : 'closed'}
			/>
		</svg>
	</button>
);

export default MenuToggle;
