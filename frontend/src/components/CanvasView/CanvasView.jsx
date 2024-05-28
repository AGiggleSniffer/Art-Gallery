import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import * as artActions from "../../store/art";
import * as sessionActions from "../../store/session";

import OpenModalButton, {
	SignupFormModal,
	LoadArtModal,
	SaveArtModal,
	DeleteArtModal,
} from "../OpenModalButton";

import useCanvasCtx from "../../hooks/useCanvasCtx";

export default function CanvasView() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const [isOwner, setIsOwner] = useState(false);
	const canvasRef = useRef(null);

	const user = useSelector(sessionActions.user);
	const myArt = useSelector(artActions.findArt(id));

	const ctx = useCanvasCtx(canvasRef);
	const clearCanvas = () => {
		const { width, height } = canvasRef.current;
		ctx.clearRect(0, 0, width, height);
	};

	useEffect(() => {
		dispatch(artActions.findOneArt(id));
	}, [dispatch, id, user]);

	useEffect(() => {
		if (user && myArt?.user_id === user?.id) {
			setIsOwner(true);
		} else {
			setIsOwner(false);
		}
	}, [myArt, user]);

	useEffect(() => {
		const img = new Image();
		img.src = myArt?.data_url;
		ctx?.drawImage(img, 0, 0);
	}, [myArt, ctx, id]);

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
					{isOwner && (
						<>
							<OpenModalButton
								buttonText="Edit & Save"
								modalComponent={
									<SaveArtModal
										canvasRef={canvasRef}
										id={id}
										navigate={navigate}
									/>
								}
							/>
							<OpenModalButton
								buttonText="Delete"
								modalComponent={
									<DeleteArtModal
										navigate={navigate}
										clear={clearCanvas}
										id={id}
									/>
								}
							/>
						</>
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
				{myArt && (
					<h3 id="Description">
						<div>Desc:</div> <div>{myArt.description}</div>
					</h3>
				)}
			</div>
		</>
	);
}
