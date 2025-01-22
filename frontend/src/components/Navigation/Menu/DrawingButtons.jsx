import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { BsBan, BsDownload, BsStarFill, BsFloppy2Fill } from "react-icons/bs";
import { SaveArtModal, SignupFormModal } from "../../Modals";
import OpenModalButton from "../../OpenModalButton";
import EditArtModal from "../../Modals/EditArtModal";
import * as sessionActions from "../../../store/session";
import * as artActions from "../../../store/art";

const DrawingButtons = ({ variant }) => {
	const sessionContext = useSelector(sessionActions.context);
	const sessionUser = useSelector(sessionActions.user);
	const currentArt = useSelector(artActions.findArt);
	const [isOwner, setIsOwner] = useState(false);

	const download = async () => {
		if (!sessionContext) return;
		const data = await sessionContext.ctx.canvas.toDataURL();
		const link = document.createElement("a");
		link.href = data;
		link.download = "picture.png";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	useEffect(() => {
		if (currentArt?.user_id === sessionUser?.id) setIsOwner(true);
		else setIsOwner(false);
	}, [currentArt, sessionUser]);

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

				<motion.div variants={variant}>
					{isOwner && (
						<OpenModalButton
							className="flex items-center py-2 px-4 hover:border-l-2 w-full"
							icon={<BsFloppy2Fill className="mr-2" />}
							modalComponent={<EditArtModal />}
							buttonText="Edit"
						/>
					)}
					{sessionUser ? (
						<OpenModalButton
							className="flex items-center py-2 px-4 hover:border-l-2 w-full purple-gradient"
							icon={<BsStarFill className="mr-2" />}
							modalComponent={<SaveArtModal />}
							buttonText="Save Drawing"
						/>
					) : (
						<OpenModalButton
							className="flex items-center py-2 px-4 hover:border-l-2 w-full purple-gradient"
							icon={<BsStarFill className="mr-2" />}
							modalComponent={
								<SignupFormModal extraMessage="Sign up to save your art" />
							}
							buttonText="Save Drawing"
						/>
					)}
				</motion.div>
			</>
		)
	);
};

export default DrawingButtons;
