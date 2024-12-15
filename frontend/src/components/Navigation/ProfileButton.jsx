import OpenModalButton from "../OpenModalButton";
import { SignupFormModal } from "../Modals";
import { BsStarFill } from "react-icons/bs";

function ProfileButton() {
	return (
		<>
			<OpenModalButton
				className="flex justify-center items-center w-full h-full"
				icon={<BsStarFill className="mr-2"/>}
				modalComponent={<SignupFormModal />}
				buttonText="Save"
			/>
		</>
	);
}

export default ProfileButton;
