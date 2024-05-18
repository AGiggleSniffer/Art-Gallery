import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import * as artActions from "../../store/art";
import * as sessionActions from "../../store/session";

import OpenModalButton from "../OpenModalButton";
import DeleteArtModal from "../DeleteArtModal/DeleteArtModal";
import LoadArtModal from "../LoadArtModal";
import SaveArtModal from "../SaveArtModal";

import useCanvasCtx from "../../hooks/useCanvasCtx";
import "./Canvas.css";
import SignupFormModal from "../SignupFormModal";
import Toolbar from "./Toolbar";

export default function CanvasHome() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const [isOwner, setIsOwner] = useState(false);
	const canvasRef = useRef(null);

	const user = useSelector(sessionActions.user);
	const myArt = useSelector(artActions.findArt(id));

	const ctx = useCanvasCtx(canvasRef, myArt);
	const clearCanvas = () => {
		const { width, height } = canvasRef.current;
		ctx.clearRect(0, 0, width, height);
	};

	useEffect(() => {
		if (!id) return;
		dispatch(artActions.findOneArt(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (user && myArt?.user_id === user?.id) {
			setIsOwner(true);
		} else {
			setIsOwner(false);
		}
	}, [myArt, user]);

	return (
		<>
			<Toolbar ctx={ctx} />
			<div id="CanvasHome">
				<div>
					<h1>CANVAS COLLECTIVE | HOME</h1>
				</div>
				<canvas ref={canvasRef} id="CanvasHome" />
				<div id="Buttons">
					<button className="classic" onClick={clearCanvas}>Clear</button>
					{user ? (
						<OpenModalButton
							buttonText="Save As"
							modalComponent={
								<SaveArtModal canvasRef={canvasRef} user={user} />
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
									<SaveArtModal canvasRef={canvasRef} user={user} id={id} />
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
							modalComponent={<LoadArtModal navigate={navigate} user={user} />}
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
