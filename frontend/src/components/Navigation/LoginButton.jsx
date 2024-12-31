import OpenModalButton from "../OpenModalButton";
import { BsStarFill } from "react-icons/bs";
import { LoginFormModal } from "../Modals";
import { useSelector } from "react-redux";
import { user } from "../../store/session";
import { BsPersonCircle } from "react-icons/bs";

const LoginButton = () => {
	const sessionUser = useSelector(user);
	return sessionUser ? (
		<button className="text-nowrap flex items-center justify-center">
			<BsPersonCircle className="mr-2" />
			Profile
		</button>
	) : (
		<OpenModalButton
			className="flex justify-center items-center w-full h-full hover:bg-white/30 transition-colors"
			icon={<BsStarFill className="mr-2" />}
			modalComponent={<LoginFormModal />}
			buttonText="Login"
		/>
	);
};

export default LoginButton;
