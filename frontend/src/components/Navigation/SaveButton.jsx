import OpenModalButton from "../OpenModalButton";
import { BsStarFill } from "react-icons/bs";
import { SaveArtModal, SignupFormModal } from "../Modals";
import { useSelector } from "react-redux";
import { user } from "../../store/session";

const SaveButton = () => {
	const sessionUser = useSelector(user);
	return sessionUser ? (
		<OpenModalButton
			className="flex justify-center items-center w-full h-full hover:bg-white/30 transition-colors"
			icon={<BsStarFill className="mr-2" />}
			modalComponent={<SaveArtModal />}
			buttonText="Save"
		/>
	) : (
		<OpenModalButton
			className="flex justify-center items-center w-full h-full hover:bg-white/30 transition-colors"
			icon={<BsStarFill className="mr-2" />}
			modalComponent={
				<SignupFormModal extraMessage="Sign up to save your art" />
			}
			buttonText="Save"
		/>
	);
};

export default SaveButton;
