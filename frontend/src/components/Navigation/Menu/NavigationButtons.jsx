import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { BsArrowsFullscreen, BsBrushFill, BsImageFill, BsInfoCircle, BsPaletteFill } from "react-icons/bs";

const NavigationButtons = ({ variant }) => {
	const styleActive = ({ isActive }) =>
        isActive ? { borderLeft: "4px solid" } : {};
    
	const toggleFullscreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
    };
    
	return (
		<>
			<motion.div variants={variant}>
				<NavLink
					to="/"
					style={styleActive}
					className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 transition-colors"
				>
					<BsBrushFill className="mr-2" />
					Draw
				</NavLink>
			</motion.div>

			<motion.div variants={variant}>
				<NavLink
					to="/arts"
					style={styleActive}
					className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 transition-colors"
				>
					<BsPaletteFill className="mr-2" />
					All Art
				</NavLink>
			</motion.div>

			<motion.div variants={variant}>
				<NavLink
					to="/galleries"
					style={styleActive}
					className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 transition-colors border-b border-b-neutral-500"
				>
					<BsImageFill className="mr-2" />
					Gallery
				</NavLink>
			</motion.div>

			<motion.button
				onClick={toggleFullscreen}
				variants={variant}
				className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-y border-b-neutral-500 border-t-neutral-700 transition-colors"
			>
				<BsArrowsFullscreen className="mr-2" />
				Fullscreen
			</motion.button>

			<motion.div variants={variant}>
				<NavLink
					target="_blank"
					to="https://github.com/AGiggleSniffer/Art-Gallery"
					className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-y border-b-neutral-500 border-t-neutral-700 transition-colors"
				>
					<BsInfoCircle className="mr-2" />
					About
				</NavLink>
			</motion.div>
		</>
	);
};

export default NavigationButtons;
