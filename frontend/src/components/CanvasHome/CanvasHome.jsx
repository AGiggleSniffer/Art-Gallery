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

	const [isPainting, setIsPainting] = useState(false);
	const [lineWidth] = useState(5);
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

	useEffect(() => {
		const canvas = canvasRef.current;

		const mousedown = () => {
			setIsPainting(true);
		};
		const mouseup = () => {
			setIsPainting(false);
			ctx.stroke();
			ctx.beginPath();
		};
		const draw = (e) => {
			if (!isPainting) return;

			if (e.touches) {
				var { clientX, clientY } = e.touches[0];
			}

			ctx.lineWidth = lineWidth;
			ctx.lineCap = "round";

			ctx.lineTo(e.offsetX || clientX, e.offsetY || clientY);
			ctx.stroke();
		};
		canvas.addEventListener("mousedown", mousedown);
		canvas.addEventListener("mouseup", mouseup);
		canvas.addEventListener("mousemove", draw);
		canvas.addEventListener("touchstart", mousedown);
		canvas.addEventListener("touchend", mouseup);
		canvas.addEventListener("touchmove", draw);

		return () => {
			canvas.removeEventListener("mousedown", mousedown);
			canvas.removeEventListener("mouseup", mouseup);
			canvas.removeEventListener("mousemove", draw);
			canvas.removeEventListener("touchstart", mousedown);
			canvas.removeEventListener("touchend", mouseup);
			canvas.removeEventListener("touchmove", draw);
		};
	}, [ctx, isPainting, lineWidth]);

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
