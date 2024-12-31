import { motion, useAnimate } from "motion/react";

const Tool = ({ children, isSelected, onButtonClick }) => {
	const [scope, animate] = useAnimate();

	const onClick = () => {
		onButtonClick();
		animate([
			[
				scope.current,
				{
					rotate: [
						"0deg",
						"-15deg",
						"15deg",
						"-15deg",
						"15deg",
						"0deg",
					],
				},
				{ duration: 0.7 },
			],
		]);
	};

	return (
		<div
			onClick={onClick}
			className="h-full w-full hover:bg-white/10 rounded-md transition-colors"
			style={
				isSelected
					? {
							backgroundColor: "rgb(14 165 233 / 0.8)",
					  }
					: {}
			}
		>
			<motion.div
				ref={scope}
				variants={{
					hover: {
						scale: [1, 1.1, 1.1, 1],
						rotate: [
							"0deg",
							"-15deg",
							"15deg",
							"-15deg",
							"15deg",
							"0deg",
						],
						transition: {
							delay: 3,
							repeatDelay: 4,
							duration: 0.7,
							repeat: Infinity,
							times: [0, 0.25, 0.5, 1],
							type: "tween",
						},
					},
					visible: { rotate: "0deg" },
				}}
				whileHover="hover"
				animate="visible"
				className="h-full w-full"
			>
				{children}
			</motion.div>
		</div>
	);
};

export default Tool;
