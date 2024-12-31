import { useModal } from "../../context/ModalProvider";

function OpenModalButton({
	modalComponent, // component to render inside the modal
	buttonText, // text of the button that opens the modal
	icon, // optional: icon to display next to text
	onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
	className,
}) {
	const { setModalContent } = useModal();

	const onClick = (e) => {
		e.stopPropagation();
		setModalContent(modalComponent);
		if (typeof onButtonClick === "function") onButtonClick();
	};

	return (
		<>
			<button className={className} onClick={onClick}>
				{icon}
				{buttonText}
			</button>
		</>
	);
}

export default OpenModalButton;
