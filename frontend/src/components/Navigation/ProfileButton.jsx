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

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		closeMenu();
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	return (
		<>
			<button onClick={toggleMenu}>
				<FaUserCircle />
				{user ? `Hi, ${user.username}` : "Profile Login" }
			</button>
			<section className={ulClassName} ref={ulRef}>
				{user ? (
					<>
						<div>{user.username}</div>
						<div>{user.email}</div>

						<OpenModalButton
							buttonText="Load Saves"
							modalComponent={<LoadArtModal navigate={navigate} />}
						/>

						<button onClick={logout}>Log Out</button>
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
		</>
	);
}

export default ProfileButton;
