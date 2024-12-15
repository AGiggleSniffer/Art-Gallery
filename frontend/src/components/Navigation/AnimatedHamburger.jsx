import { motion, MotionConfig } from "motion/react";

const AnimatedHamburger = ({ active, ...props }) => {
	return (
		<div {...props}>
			<MotionConfig initial={false} transition={{ duration: 0.3 }}>
				<motion.button
					animate={active ? "closed" : "open"}
					className="relative h-full w-16 size-4 hover:!bg-white/10 "
					variants={{
						open: { backgroundColor: "#525252" },
						closed: { backgroundColor: "rgb(0 0 0 / 0)" },
					}}
				>
					<motion.span
						variants={{
							open: {
								rotate: ["0deg", "0deg", "45deg"],
								top: ["25%", "50%", "50%"],
							},
							closed: {
								rotate: ["45deg", "0deg", "0deg"],
								top: ["50%", "50%", "25%"],
							},
						}}
						style={{
							left: "50%",
							top: "25%",
							x: "-50%",
							y: "-50%",
						}}
						className="absolute h-1 w-8 bg-white rounded-full"
					/>
					<motion.span
						variants={{
							open: {
								rotate: ["0deg", "0deg", "-45deg"],
							},
							closed: {
								rotate: ["-45deg", "0deg", "0deg"],
							},
						}}
						style={{
							left: "50%",
							top: "50%",
							x: "-50%",
							y: "-50%",
						}}
						className="absolute h-1 w-8 bg-white rounded-full"
					/>
					<motion.span
						variants={{
							open: {
								rotate: ["0deg", "0deg", "45deg"],
								bottom: ["25%", "50%", "50%"],
								left: "50%",
							},
							closed: {
								rotate: ["45deg", "0deg", "0deg"],
								bottom: ["50%", "50%", "25%"],
							},
						}}
						style={{
							left: "calc(50% - 8px)",
							bottom: "25%",
							x: "-50%",
							y: "50%",
						}}
						className="absolute h-1 w-4 bg-white rounded-full"
					/>
				</motion.button>
			</MotionConfig>
		</div>
	);
};

export default AnimatedHamburger;
