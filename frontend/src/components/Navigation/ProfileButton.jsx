import SaveButton from "./SaveButton";
import LoginButton from "./LoginButton";
import { useSelector } from "react-redux";
import { context } from "../../store/session";

function ProfileButton() {
	const sessionContext = useSelector(context);
	return sessionContext ? <SaveButton /> : <LoginButton />;
	
}

export default ProfileButton;
