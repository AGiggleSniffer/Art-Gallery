import { useModal } from "../../context/Modal";

function OpenModalButton({
	modalComponent, // component to render inside the modal
	buttonText, // text of the button that opens the modal
	icon, // optional: icon to display next to text
	onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
	onModalClose, // optional: callback function that will be called once the modal is closed
}) {
	const { setModalContent, setOnModalClose } = useModal();

	const onClick = () => {
		if (onModalClose) setOnModalClose(onModalClose);
		setModalContent(modalComponent);
		if (typeof onButtonClick === "function") onButtonClick();
	};

	return (
		<button className="flex items-center" onClick={onClick}>
			{icon}
			{buttonText}
		</button>
	);
}

export default OpenModalButton;
