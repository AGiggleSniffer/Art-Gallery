import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded, title, extraButtons }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<nav id="Navigation">
			<h2 id="title">{title}</h2>
			<NavLink to="/">Home</NavLink>

			{isLoaded && <ProfileButton user={sessionUser} />}
			<section id="Navigation__extra">{extraButtons}</section>
		</nav>
	);
}

export default Navigation;
