import OpenModalButton from "../OpenModalButton";
import { BsStarFill } from "react-icons/bs";
import { LoginFormModal } from "../Modals";
import { useSelector } from "react-redux";
import { user } from "../../store/session";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
	const navigate = useNavigate();
	const sessionUser = useSelector(user);
	return sessionUser ? (
		<button
			className="text-nowrap flex items-center justify-center h-full w-full hover:bg-white/30 transition-colors"
			onClick={() => navigate("/profile")}
		>
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
