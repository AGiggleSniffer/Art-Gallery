import { BsArrowBarLeft, BsPersonAdd } from "react-icons/bs";
import { user } from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import OpenModalButton from "../../OpenModalButton";
import * as sessionActions from "../../../store/session";
import { SignupFormModal } from "../../Modals";

const UserButtons = ({ variant }) => {
	const dispatch = useDispatch();

	const sessionUser = useSelector(user);

	const logout = () => {
		dispatch(sessionActions.logout());
	};

	return sessionUser ? (
		<motion.button
			onClick={logout}
			variants={variant}
			className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-y border-b-neutral-500 border-t-neutral-700 transition-colors"
		>
			<BsArrowBarLeft className="mr-2" />
			Log Out
		</motion.button>
	) : (
		<motion.button
			variants={variant}
			className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-y border-b-neutral-500 border-t-neutral-700 transition-colors"
		>
			<OpenModalButton
				className="flex items-center"
				icon={<BsPersonAdd className="mr-2" />}
				modalComponent={<SignupFormModal />}
				buttonText="Create Account"
			/>
		</motion.button>
	);
};

export default UserButtons;
