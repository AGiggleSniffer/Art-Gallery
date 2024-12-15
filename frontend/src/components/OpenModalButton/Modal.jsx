import { motion } from "motion/react";
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

const Modal = ({ children }) => {
	const { close } = useModal();
	return (
		<>
			<div className="fixed top-0 left-0 flex justify-center items-center w-svw h-svh">
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
					onClick={(e) => e.stopPropagation()}
					className="fixed"
				>
					{children}
				</motion.div>
			</div>
		</>
	);
};

export default Modal;
