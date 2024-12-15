import { AnimatePresence } from "motion/react";
import { useModal } from "../../context/ModalProvider";
import Modal from "./Modal";

function OpenModalButton({
	modalComponent, // component to render inside the modal
	buttonText, // text of the button that opens the modal
	icon, // optional: icon to display next to text
	onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
}) {
	const { modalOpen, open } = useModal();

	const onClick = () => {
		open();
		if (typeof onButtonClick === "function") onButtonClick();
	};

	return (
		<>
			<button
				className="flex items-center h-full w-full justify-center"
				onClick={onClick}
			>
				{icon}
				{buttonText}
			</button>
			<AnimatePresence>
				{modalOpen && <Modal>{modalComponent}</Modal>}
			</AnimatePresence>
		</>
	);
}

export default OpenModalButton;
