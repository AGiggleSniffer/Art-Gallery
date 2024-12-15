import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { VscSave, VscSaveAs } from "react-icons/vsc";
import { BsTrash, BsBan } from "react-icons/bs";

import * as artActions from "../../store/art";
import * as sessionActions from "../../store/session";

import OpenModalButton from "../OpenModalButton";
import {
	SignupFormModal,
	SaveArtModal,
	DeleteArtModal,
} from "../Modals";

import useCanvasCtx from "../../hooks/useCanvasCtx";

import Toolbar from "../Toolbar";

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
				<div id="CanvasContainer">
					<div id="Buttons">
						<Toolbar />
						<button className="classic" onClick={clearCanvas}>
							<BsBan />
							Clear
						</button>
						{isOwner && (
							<OpenModalButton
								buttonText="Save"
								icon={<VscSaveAs />}
								modalComponent={
									<SaveArtModal
										canvasRef={canvasRef}
										id={id}
										navigate={navigate}
									/>
								}
							/>
						)}
						{user ? (
							<OpenModalButton
								buttonText="Save As..."
								icon={<VscSave />}
								modalComponent={
									<SaveArtModal canvasRef={canvasRef} navigate={navigate} />
								}
							/>
						) : (
							<OpenModalButton
								buttonText="Save As..."
								icon={<VscSave />}
								modalComponent={
									<SignupFormModal extraMessage="Sign in or Sign up to Save" />
								}
							/>
						)}
						{isOwner && (
							<OpenModalButton
								buttonText="Delete"
								icon={<BsTrash />}
								modalComponent={<DeleteArtModal navigate={navigate} id={id} />}
							/>
						)}
					</div>
					<canvas ref={canvasRef} />
					<h3 id="Description">
						<div>Desc:</div> <div>{myArt?.description}</div>
					</h3>
				</div>
				<div id="Tags">
					{myArt?.ArtTags?.map(({ type, id }) => (
						<span key={id}>#{type}</span>
					))}
				</div>
			</div>
		</>
	);
}
