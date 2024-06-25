import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import OpenModalButton, {
	LoadArtModal,
	LoginFormModal,
	SignupFormModal,
} from "../OpenModalButton";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	const logout = () => {
		dispatch(sessionActions.logout());
		closeMenu();
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	const profileClass = showMenu ? "active" : " ";

	return (
		<>
			<section className={ulClassName} ref={ulRef}>
				{user ? (
					<>
						<div>{user.email}</div>

						<OpenModalButton
							buttonText="Load Saves"
							modalComponent={<LoadArtModal navigate={navigate} />}
						/>

						<OpenModalButton buttonText="Log Out" onButtonClick={logout} />
					</>
				) : (
					<>
						<OpenModalButton
							buttonText="Log In"
							onButtonClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>

						<OpenModalButton
							buttonText="Sign Up"
							onButtonClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</>
				)}
			</section>
			<button className={profileClass} onClick={toggleMenu}>
				{user ? `Hi, ${user.username}` : "Profile Login"}
				<FaUserCircle style={{marginLeft: "10px"}} />
			</button>
		</>
	);
}

export default ProfileButton;
