import { motion } from "motion/react";
import randInt from "../../utils/randInt.js";

const ArtMotionFrame = ({ children, scrollRef }) => {
	return (
		<motion.div
			className="relative"
			style={{ originY: 0 }}
			initial={{
				y: "10vh",
				rotateZ: randInt(0, 1) ? randInt(5, 45) : -randInt(5, 45),
			}}
			whileInView={{
				y: 0,
				rotateZ: 0,
				transition: {
					type: "spring",
					damping: randInt(3, 10),
					duration: 50,
					y: {
						damping: 100,
					},
				},
			}}
			viewport={{ root: scrollRef, once: false }}
			exit={{
				y: "110vh",
				rotateZ: randInt(0, 1) ? randInt(15, 65) : -randInt(15, 65),
				transition: {
					duration: 0.5,
				},
			}}
		>
			{children}
		</motion.div>
	);
};

export default ArtMotionFrame;
