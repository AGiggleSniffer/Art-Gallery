import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
	BsArrowsFullscreen,
	BsBan,
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
	hidden: {
		x: "-100%",
	},
	visible: {
		x: 0,
		transition: {
			staggerChildren: 0.05,
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

const Menu = ({ context, ...props }) => {
	const [isHidden, setHidden] = useState(true);
	const changeHidden = (e) => {
		e.stopPropagation();
		setHidden((state) => !state);
	};

	const download = async () => {
		const data = await context.canvas.toDataURL();
		const link = document.createElement("a");
		link.href = data;
		link.download = "picture.png";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const toggleFullscreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
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

							<motion.button
								onClick={toggleFullscreen}
								variants={slide}
								className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-y border-b-neutral-500 border-t-neutral-700 transition-colors"
							>
								<BsArrowsFullscreen className="mr-2" />
								Fullscreen
							</motion.button>

							<motion.div variants={slide}>
								<NavLink
									to="https://github.com/AGiggleSniffer/Art-Gallery"
									className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-y border-b-neutral-500 border-t-neutral-700 transition-colors"
								>
									<BsInfoCircle className="mr-2" />
									About
								</NavLink>
							</motion.div>

							<motion.button
								variants={slide}
								className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-y border-b-neutral-500 border-t-neutral-700 transition-colors"
							>
								<BsPersonAdd className="mr-2" />
								Create Account
							</motion.button>

							{context && (
								<>
									<motion.button
										onClick={context.clearCanvas}
										variants={slide}
										className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-t border-t-neutral-700 transition-colors"
									>
										<BsBan className="mr-2" />
										Clear Drawing
									</motion.button>

									<motion.button
										onClick={download}
										variants={slide}
										className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 transition-colors"
									>
										<BsDownload className="mr-2" />
										Download
									</motion.button>

									<motion.button
										variants={slide}
										className="flex items-center py-2 px-4 hover:border-l-2 bg-gradient-to-r from-violet-500 to-fuchsia-500"
									>
										<BsStarFill className="mr-2" />
										Save Drawing
									</motion.button>
								</>
							)}
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Menu;
