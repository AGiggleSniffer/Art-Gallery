import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscSaveAs } from "react-icons/vsc";
import { BsBan } from "react-icons/bs";

import * as sessionActions from "../../store/session";

import OpenModalButton, {
	SaveArtModal,
	SignupFormModal,
} from "../OpenModalButton";

import useCanvasCtx from "../../hooks/useCanvasCtx";

// import "./Canvas.css";
import Toolbar from "../Toolbar";

export default function CanvasHome() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(sessionActions.user);
	const canvasRef = useRef(null);
	const ctx = useCanvasCtx(canvasRef);
	const clearCanvas = () => {
		const { width, height } = canvasRef.current;
		ctx.clearRect(0, 0, width, height);
	};

	useEffect(() => {
		dispatch(sessionActions.updateCtx(ctx));
	}, [dispatch, ctx]);

	return (
		<>
			<div className="w-full h-[50vh] flex">
				<div className="w-full">
					<div id="Buttons">
						<Toolbar />
						<button className="classic" onClick={clearCanvas}>
							<BsBan />
							Clear
						</button>
						{user ? (
							<OpenModalButton
								buttonText="Save As..."
								icon={<VscSaveAs />}
								modalComponent={
									<SaveArtModal
										canvasRef={canvasRef}
										navigate={navigate}
									/>
								}
							/>
						) : (
							<OpenModalButton
								buttonText="Save As..."
								icon={<VscSaveAs />}
								modalComponent={
									<SignupFormModal extraMessage="Sign in or Sign up to Save As" />
								}
							/>
						)}
					</div>
					<canvas
						className="border-2 border-black bg-[#66CCCC]"
						ref={canvasRef}
					/>
				</div>
			</div>
		</>
	);
}
