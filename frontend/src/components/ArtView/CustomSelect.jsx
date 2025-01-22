import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BsCaretRightFill } from "react-icons/bs";

const CustomSelect = ({
	options,
	selected,
	setSelected,
	scrollRef,
	bottom,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const changeOpen = (e) => {
		e.stopPropagation();
		e.preventDefault();
		setIsOpen((state) => !state);
	};

	useEffect(() => {
		const closeMenu = (e) => {
			if (!isOpen) return;
			changeOpen(e);
		};

		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [isOpen]);

	return (
		<div {...props}>
			<div className="relative" onClick={changeOpen}>
				<button className="flex items-center justify-between w-12 h-full px-1">
					<div>{selected}</div>
					<motion.div
						initial={{ rotate: 0 }}
						animate={
							isOpen
								? { rotate: bottom ? "-90deg" : "90deg" }
								: {}
						}
					>
						<BsCaretRightFill className="text-xs" />
					</motion.div>
				</button>
				{isOpen && (
					<div
						style={bottom ? { bottom: "100%" } : {}}
						className="absolute bg-white flex flex-col rounded w-full left-0 border border-neutral-600 shadow-md"
					>
						{options.map((ele) => (
							<button
								className="text-left px-1 hover:bg-blue-600 transition-colors"
								onClick={() => {
									scrollRef?.current?.scrollTo(0, 0);
									setSelected(ele);
								}}
								key={ele}
							>
								{ele}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default CustomSelect;
