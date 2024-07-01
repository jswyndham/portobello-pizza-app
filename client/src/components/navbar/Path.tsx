import { motion, SVGMotionProps } from 'framer-motion';

interface PathProps extends SVGMotionProps<SVGPathElement> {}

const Path: React.FC<PathProps> = (props) => (
	<motion.path
		fill="transparent"
		strokeWidth="3"
		stroke="white"
		strokeLinecap="round"
		{...props}
	/>
);

export default Path;
