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
import { motion } from "motion/react";

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
			{!isHidden && (
				<>
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						className="flex flex-col absolute bg-neutral-600 w-64 top-10 left-0 rounded-tr-md overflow-hidden"
					>
						<NavLink
							to="/"
							style={styleActive}
							className="flex items-center py-2 px-4 hover:bg-neutral-500 border-t
                          border-t-neutral-600"
						>
							<BsBrushFill className="mr-2" />
							Draw
						</NavLink>

						<NavLink
							to="/arts"
							style={styleActive}
							className="flex items-center py-2 px-4 hover:bg-neutral-500 hover:border-l-2"
						>
							<BsPaletteFill className="mr-2" />
							All Art
						</NavLink>

						<NavLink
							to="/galleries"
							style={styleActive}
							className="flex items-center py-2 px-4 hover:bg-neutral-500 hover:border-l-2 border-b border-b-neutral-500"
						>
							<BsImageFill className="mr-2" />
							Gallery
						</NavLink>

						<div className="flex items-center py-2 px-4 hover:bg-neutral-500 hover:border-l-2 border-t border-t-neutral-700">
							<BsDownload className="mr-2" />
							Download
						</div>

						<div className="flex items-center py-2 px-4 hover:bg-neutral-500 hover:border-l-2 border-b border-b-neutral-500 ">
							<BsArrowsFullscreen className="mr-2" />
							Fullscreen
						</div>

						<NavLink
							to="https://github.com/AGiggleSniffer"
							className="flex items-center py-2 px-4 hover:bg-neutral-500 hover:border-l-2 border-y border-b-neutral-500 border-t-neutral-700"
						>
							<BsInfoCircle className="mr-2" />
							About
						</NavLink>

						<div className="flex items-center py-2 px-4 hover:bg-neutral-500 hover:border-l-2 border-y border-b-neutral-500 border-t-neutral-700">
							<BsPersonAdd className="mr-2" />
							Create Account
						</div>

						<div className="flex items-center py-2 px-4 hover:border-l-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-80">
							<BsStarFill className="mr-2" />
							Save Drawing
						</div>
					</motion.div>
				</>
			)}
		</div>
	);
};

export default Menu;
