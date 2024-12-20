import OpenModalButton from "../OpenModalButton";
import { SignupFormModal } from "../Modals";
import { BsStarFill } from "react-icons/bs";

function ProfileButton({ context, user }) {

	const navButton = () => {
		if (context) {
			
		}
	}

	return (
		<>
			{context ? (
				<OpenModalButton
					className="flex justify-center items-center w-full h-full hover:bg-white/30 transition-colors"
					icon={<BsStarFill className="mr-2" />}
					modalComponent={<SignupFormModal />}
					buttonText="Save"
				/>
			) : (
				<OpenModalButton
					className="flex justify-center items-center w-full h-full hover:bg-white/30 transition-colors"
					icon={<BsStarFill className="mr-2" />}
					modalComponent={<SignupFormModal />}
					buttonText="Save"
				/>
			)}
		</>
	);
}

export default ProfileButton;
