const FilterButton = ({ children, onClick, isActive }) => {
	return (
		<button
			style={isActive ? { backgroundColor: "white", color: "black" } : {}}
			className={
				"my-2 mx-1 px-4 p-1 rounded-lg bg-neutral-900/30 text-sm transition-colors text-nowrap"
			}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default FilterButton;
