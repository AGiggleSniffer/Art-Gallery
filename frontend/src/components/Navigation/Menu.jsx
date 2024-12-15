import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
	BsArrowsFullscreen,
	BsBrushFill,
	BsDownload,
	BsImageFill,
	BsInfoCircle,
	BsPaletteFill,
	BsPersonAdd,
	BsStarFill,
} from "react-icons/bs";
import AnimatedHamburger from "./AnimatedHamburger";
import { AnimatePresence, motion } from "motion/react";

const container = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
	exit: {
		x: "-100%",
	},
};

const slide = {
	hidden: {
		x: "-100%",
	},
	visible: {
		x: 0,
	},
	exit: {},
};

const Menu = ({ ...props }) => {
	const [isHidden, setHidden] = useState(true);
	const changeHidden = (e) => {
		e.stopPropagation();
		setHidden((state) => !state);
	};

	const styleActive = ({ isActive }) =>
		isActive ? { borderLeft: "4px solid" } : {};

	useEffect(() => {
		const closeMenu = (e) => {
			if (isHidden) return;
			changeHidden(e);
		};

		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [isHidden]);

	return (
		<div {...props}>
			<AnimatedHamburger
				active={isHidden}
				onClick={changeHidden}
				className="w-full h-full"
			/>
			<AnimatePresence>
				{!isHidden && (
					<>
						<motion.div
							variants={container}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="flex flex-col absolute bg-neutral-600 w-64 top-10 left-0 rounded-tr-md overflow-hidden"
						>
							<motion.div variants={slide}>
								<NavLink
									to="/"
									style={styleActive}
									className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 transition-colors"
								>
									<BsBrushFill className="mr-2" />
									Draw
								</NavLink>
							</motion.div>

							<motion.div variants={slide}>
								<NavLink
									to="/arts"
									style={styleActive}
									className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 transition-colors"
								>
									<BsPaletteFill className="mr-2" />
									All Art
								</NavLink>
							</motion.div>

							<motion.div variants={slide}>
								<NavLink
									to="/galleries"
									style={styleActive}
									className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 transition-colors border-b border-b-neutral-500"
								>
									<BsImageFill className="mr-2" />
									Gallery
								</NavLink>
							</motion.div>

							<motion.div
								variants={slide}
								className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-t border-t-neutral-700 transition-colors"
							>
								<BsDownload className="mr-2" />
								Download
							</motion.div>

							<motion.div
								variants={slide}
								className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-b border-b-neutral-500 transition-colors"
							>
								<BsArrowsFullscreen className="mr-2" />
								Fullscreen
							</motion.div>

							<motion.div variants={slide}>
								<NavLink
									to="https://github.com/AGiggleSniffer"
									className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-y border-b-neutral-500 border-t-neutral-700 transition-colors"
								>
									<BsInfoCircle className="mr-2" />
									About
								</NavLink>
							</motion.div>

							<motion.div
								variants={slide}
								className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-y border-b-neutral-500 border-t-neutral-700 transition-colors"
							>
								<BsPersonAdd className="mr-2" />
								Create Account
							</motion.div>

							<motion.div
								variants={slide}
								className="flex items-center py-2 px-4 hover:border-l-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-80 transition-opacity"
							>
								<BsStarFill className="mr-2" />
								Save Drawing
							</motion.div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Menu;
