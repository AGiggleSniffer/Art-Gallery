import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as artActions from "../../store/art";
import OpenModalButton from "../OpenModalButton";
import LoadArtModal from "../LoadArtModal";
import SaveArtModal from "../SaveArtModal";
import useCanvasCtx from "../../hooks/useCanvasCtx";
import "./Canvas.css";

export default function CanvasHome() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const [isOwner, setIsOwner] = useState(false);
	const canvasRef = useRef(null);

	const user = useSelector((state) => state.session.user);
	const myArt = useSelector((state) => state.art.allArt[id]);

	const clearCanvas = () => {
		const { width, height } = canvasRef.current;
		ctx.clearRect(0, 0, width, height);
	};

	const ctx = useCanvasCtx(canvasRef, myArt);

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
			<div id="CanvasHome">
				<div>
					<h1>CANVAS COLLECTIVE | HOME</h1>
				</div>
				<canvas ref={canvasRef} id="CanvasHome" />
				<div id="Buttons">
					<button onClick={clearCanvas}>Clear</button>
					<OpenModalButton
						buttonText="Save As"
						modalComponent={<SaveArtModal canvasRef={canvasRef} user={user} />}
					/>
					{isOwner && (
						<OpenModalButton
							buttonText="Edit & Save"
							modalComponent={
								<SaveArtModal canvasRef={canvasRef} user={user} id={id} />
							}
						/>
					)}
					<OpenModalButton
						buttonText="Load Saves"
						modalComponent={<LoadArtModal navigate={navigate} />}
					/>
				</div>
			</div>
		</>
	);
}
