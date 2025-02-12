import ProfileButton from "./ProfileButton";
import Menu from "./Menu";

function Navigation({ isLoaded }) {
	return (
		<nav className="relative flex justify-between items-center w-screen bg-neutral-600/50 h-10 select-none z-20">
			<span className="md:w-28 w-16">
				<div className="w-fit flex justify-start cursor-pointer">
					{isLoaded && <Menu className="h-10 w-16" />}
				</div>
			</span>
			<span className="flex justify-end md:justify-center items-center text-xs sm:text-base text-nowrap p-1 w-full">
				<img src="/Icon.png" className="w-10 mr-2" />
				<div className="font-bold hidden md:inline">
					CANVAS COLLECTIVE
				</div>
			</span>
			<span className="purple-gradient w-28 h-full  justify-center transition-opacity hidden md:flex">
				{isLoaded && <ProfileButton />}
			</span>
		</nav>
	);
}

export default Navigation;
