
import { useSelector } from "react-redux";
import { user } from "../../store/session";
import ProfileButton from "./ProfileButton";
import Menu from "./Menu";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(user);

	return (
		<nav className="relative flex justify-between items-center w-screen bg-neutral-600/50 h-10 select-none z-10">
			<span className="w-fit flex justify-start cursor-pointer">
				<Menu className="flex justify-center items-center h-10 w-16" />
			</span>
			<span className="flex justify-center items-center text-xs sm:text-base text-nowrap p-1">
				<img src="./Icon.png" className="size-8 mr-2" />
				<div className="font-bold">CANVAS COLLECTIVE</div>
			</span>
			<span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-28 h-full flex justify-center transition-opacity">
				{isLoaded && <ProfileButton user={sessionUser} />}
			</span>
		</nav>
	);
}

export default Navigation;
