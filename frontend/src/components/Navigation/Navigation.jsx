import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsHouse, BsEasel, BsPalette } from "react-icons/bs";
import { user } from "../../store/session";
import ProfileButton from "./ProfileButton";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(user);

	return (
		<nav>
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
			<span>
				{isLoaded && <ProfileButton user={sessionUser} />}
			</span>
		</nav>
	);
}

export default Navigation;
