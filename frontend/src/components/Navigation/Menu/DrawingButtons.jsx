import { BsBan, BsDownload, BsStarFill } from "react-icons/bs";
import { context } from "../../../store/session";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { SaveArtModal } from "../../Modals";
import OpenModalButton from "../../OpenModalButton";

const DrawingButtons = ({ variant }) => {
	const sessionContext = useSelector(context);

	const download = async () => {
		const data = await sessionContext.canvas.toDataURL();
		const link = document.createElement("a");
		link.href = data;
		link.download = "picture.png";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		sessionContext && (
			<>
				<motion.button
					onClick={sessionContext.clearCanvas}
					variants={variant}
					className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 border-t border-t-neutral-700 transition-colors"
				>
					<BsBan className="mr-2" />
					Clear Drawing
				</motion.button>

				<motion.button
					onClick={download}
					variants={variant}
					className="flex items-center py-2 px-4 hover:bg-white/10 hover:border-l-2 transition-colors"
				>
					<BsDownload className="mr-2" />
					Download
				</motion.button>

				<motion.div
					variants={variant}
					className="py-2 px-4 hover:border-l-2 bg-gradient-to-r from-violet-500 to-fuchsia-500"
				>
					<OpenModalButton
						className="flex items-center"
						icon={<BsStarFill className="mr-2" />}
						modalComponent={<SaveArtModal />}
						buttonText="Save Drawing"
					/>
				</motion.div>
			</>
		)
	);
};

export default DrawingButtons;
