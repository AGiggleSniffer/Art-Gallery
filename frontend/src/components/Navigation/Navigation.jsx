
import { useSelector } from "react-redux";
import { user } from "../../store/session";
import ProfileButton from "./ProfileButton";
import Menu from "./Menu";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(user);

	return (
		<nav className="relative flex justify-between items-center w-screen bg-neutral-700 h-10 select-none">
			<span className="w-fit flex justify-start cursor-pointer hover:bg-neutral-600">
				<Menu className="flex justify-center items-center h-10" />
			</span>
			<span className="flex justify-center items-center">
				<img src="./Icon.png" className="size-8 mr-2" />
				<div className="font-bold">CANVAS COLLECTIVE</div>
			</span>
			<span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-28 h-full flex justify-center">
				{isLoaded && <ProfileButton user={sessionUser} />}
			</span>
		</nav>
	);
}

export default Navigation;
