import OpenModalButton from "../OpenModalButton";
import { SignupFormModal } from "../Modals";

function ProfileButton() {
	return (
		<>
			<OpenModalButton
				modalComponent={<SignupFormModal />}
				buttonText="Save"
			/>
		</>
	);
}

export default ProfileButton;
