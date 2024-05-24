import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as sessionActions from "../../store/session";

import OpenModalButton, {
	LoadArtModal,
	SaveArtModal,
	SignupFormModal,
} from "../OpenModalButton";

import useCanvasCtx from "../../hooks/useCanvasCtx";
import "./Canvas.css";

export default function CanvasHome() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const canvasRef = useRef(null);

	const user = useSelector(sessionActions.user);

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
			<div id="CanvasHome">
				<canvas ref={canvasRef} id="CanvasHome" />
				<div id="Buttons">
					<button className="classic" onClick={clearCanvas}>
						Clear
					</button>
					{user ? (
						<OpenModalButton
							buttonText="Save As"
							modalComponent={
								<SaveArtModal canvasRef={canvasRef} navigate={navigate} />
							}
						/>
					) : (
						<OpenModalButton
							buttonText="Save As"
							modalComponent={
								<SignupFormModal extraMessage="Sign in or Sign up to Save As" />
							}
						/>
					)}
					{user ? (
						<OpenModalButton
							buttonText="Load Saves"
							modalComponent={<LoadArtModal navigate={navigate} />}
						/>
					) : (
						<OpenModalButton
							buttonText="Load Saves"
							modalComponent={
								<SignupFormModal extraMessage="Sign in or Sign up to Load Saves" />
							}
						/>
					)}
				</div>
			</div>
		</>
	);
}
