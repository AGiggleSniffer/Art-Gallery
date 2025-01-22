import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import {
	BsArrowBarLeft,
	BsPersonAdd,
	BsPerson,
	BsPersonCircle,
} from "react-icons/bs";

import { LoginFormModal, SignupFormModal } from "../../Modals";
import OpenModalButton from "../../OpenModalButton";
import * as sessionActions from "../../../store/session";

const UserButtons = ({ variant }) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(sessionActions.user);

	const logout = () => {
		dispatch(sessionActions.logout());
	};

	const styleActive = ({ isActive }) =>
		isActive
			? {
					borderLeft: "4px solid",
					backgroundColor: "rgb(255 255 255 / 0.1)",
			  }
			: {};

	return sessionUser ? (
		<>
			<motion.button variants={variant}>
				<NavLink
					to="/profile"
					style={styleActive}
					className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-t  border-t-neutral-700 transition-colors"
				>
					<BsPerson className="mr-2" />
					Profile
				</NavLink>
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
