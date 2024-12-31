import { AnimatePresence, motion } from "motion/react";
import { useModal } from "../../context/ModalProvider";

const dropIn = {
	hidden: {
		y: "-100vh",
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		y: "100vh",
		opacity: 0,
	},
};

const Modal = () => {
	const { modalContent, close } = useModal();
	return (
		<>
			<AnimatePresence>
				{modalContent && (
					<div className="fixed top-0 left-0 flex justify-center items-center w-svw h-svh z-50">
						<motion.div
							onClick={close}
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.7 }}
							exit={{ opacity: 0 }}
							className="fixed top-0 left-0 h-svh w-svw bg-black"
						/>
						<motion.div
							variants={dropIn}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="fixed flex justify-center items-center lg:max-w-5/6"
						>
							{modalContent}
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Modal;
