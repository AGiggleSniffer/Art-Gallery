import {
	BsArrowBarLeft,
	BsPersonAdd,
	BsPerson,
	BsPersonCircle,
} from "react-icons/bs";
import { user } from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import OpenModalButton from "../../OpenModalButton";
import * as sessionActions from "../../../store/session";
import { LoginFormModal, SignupFormModal } from "../../Modals";

const UserButtons = ({ variant }) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(user);

	const logout = () => {
		dispatch(sessionActions.logout());
	};

	return sessionUser ? (
		<>
			<motion.button
				variants={variant}
				className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-t border-t-neutral-700 transition-colors"
			>
				<BsPerson className="mr-2" />
				Profile
			</motion.button>
			<motion.button
				onClick={logout}
				variants={variant}
				className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-b border-b-neutral-500 transition-colors"
			>
				<BsArrowBarLeft className="mr-2" />
				Log Out
			</motion.button>
		</>
	) : (
		<>
			<motion.div variants={variant}>
				<OpenModalButton
					className="flex items-center w-full h-full py-2 px-4 hover:bg-white/10 hover:border-l-2 border-t  border-t-neutral-700 transition-colors"
					icon={<BsPersonAdd className="mr-2" />}
					modalComponent={<SignupFormModal />}
					buttonText="Create Account"
				/>
			</motion.div>
			<motion.div variants={variant}>
				<OpenModalButton
					className="flex items-center w-full h-full py-2 px-4 hover:bg-white/10 hover:border-l-2 border-b border-b-neutral-500 transition-colors"
					icon={<BsPersonCircle className="mr-2" />}
					modalComponent={<LoginFormModal />}
					buttonText="Login"
				/>
			</motion.div>
		</>
	);
};

export default UserButtons;
