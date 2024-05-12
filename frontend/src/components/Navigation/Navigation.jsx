import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsHouse, BsEasel, BsPalette, BsHash } from "react-icons/bs";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();

	return (
		<nav id="Navigation">
			<span>
				<div onClick={() => navigate("/")}>
					<BsHouse />
					<NavLink to="/">Home</NavLink>
				</div>
				<div onClick={() => navigate("/arts")}>
					<BsPalette />
					<NavLink to="/arts">All Art</NavLink>
				</div>
				<div onClick={() => navigate("/galleries")}>
					<BsEasel />
					<NavLink to="/galleries">Galleries</NavLink>
				</div>
				<div onClick={() => navigate("/tags")}>
					<BsHash />
					<NavLink to="/tags">Tags</NavLink>
				</div>
			</span>
			<span id="Tags">
				<p>FIND BY TAG</p>
				<div>
					<BsHash />
					some tag
				</div>
				<div>
					<BsHash />
					other tag
				</div>
				<div>
					<BsHash />
					anotha one
				</div>
			</span>
			<span>{isLoaded && <ProfileButton user={sessionUser} />}</span>
		</nav>
	);
}

export default Navigation;
