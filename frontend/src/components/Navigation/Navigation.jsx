import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsHouse, BsEasel, BsPalette } from "react-icons/bs";
import { user } from "../../store/session";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(user);

	return (
		<nav id="Navigation">
			<span>
				<NavLink to="/">
					<BsHouse />
					Home
				</NavLink>

				<NavLink to="/arts">
					<BsPalette />
					All Art
				</NavLink>

				<NavLink to="/galleries">
					<BsEasel />
					Galleries
				</NavLink>
			</span>
			<span id="Profile">
				{isLoaded && <ProfileButton user={sessionUser} />}
			</span>
		</nav>
	);
}

export default Navigation;
