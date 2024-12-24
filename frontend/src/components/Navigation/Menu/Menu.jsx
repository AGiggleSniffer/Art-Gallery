import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AnimatedHamburger from "./AnimatedHamburger";
import DrawingButtons from "./DrawingButtons";
import UserButtons from "./UserButtons";
import NavigationButtons from "./NavigationButtons";

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

const Menu = ({ ...props }) => {
	const [isHidden, setHidden] = useState(true);
	const changeHidden = (e) => {
		e.stopPropagation();
		setHidden((state) => !state);
	};

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
							<NavigationButtons variant={slide} />

							<UserButtons variant={slide} />

							<DrawingButtons variant={slide} />
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Menu;
