import { BsStarFill } from "react-icons/bs";
import { motion, useAnimate } from "motion/react";

const SPARKLE_AMT = 10;
const randInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const LikeCounter = ({ className, icon, icon2, count, active, onClick }) => {
	const [scope, animate] = useAnimate();

	const onButtonClick = () => {
		onClick();
		const sparkles = Array.from({ length: SPARKLE_AMT });
		const sparkleAnims = sparkles.map((_, index) => [
			`.sparkle-${index}`,
			{
				x: randInt(-100, 100),
				y: randInt(-100, 100),
				scale: [randInt(1.5, 2.5), 0],
				opacity: [1, 0],
			},
			{ duration: 0.4, at: "<" },
		]);

		const sparkleAnimsReset = sparkles.map((_, index) => [
			`.sparkle-${index}`,
			{
				x: 0,
				y: 0,
			},
			{ duration: 0.00001, at: "<" },
		]);

		animate([
			...sparkleAnimsReset,
			[
				scope.current,
				{
					scale: [1.2, 1],
					rotate: ["15deg", "-15deg", "0deg"],
					transition: { duration: 0.5, at: "<" },
				},
			],
			...sparkleAnims,
		]);
	};

	const stars = Array.from({ length: SPARKLE_AMT }).map((_, index) => (
		<BsStarFill
			className={`absolute size-2 opacity-0 sparkle-${index}`}
			key={index}
		/>
	));

	return (
		<motion.button
			ref={scope}
			onClick={onButtonClick}
			className={className}
		>
			{active ? icon2 : icon}
			{count}
			{stars}
		</motion.button>
	);
};

export default LikeCounter;
