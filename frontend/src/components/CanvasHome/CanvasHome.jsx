import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as artActions from "../../store/art";
import "./Canvas.css";
import OpenModalButton from "../OpenModalButton";
import LoadArtModal from "../LoadArtModal/LoadArtModal";

export default function CanvasHome() {
	const canvasRef = useRef(null);
	const [isPainting, setIsPainting] = useState(false);
	const [lineWidth] = useState(5);
	const [ctx, setCtx] = useState(null);
	const [previous, setPrevious] = useState(null);
	const [galleryId, ] = useState(null);
	const [description, ] = useState("");
	const [name, ] = useState("");

	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const myArt = useSelector((state) => state.art.myArt);

	useEffect(() => {
		dispatch(artActions.loadThunk());
	}, [dispatch]);

	const clearCanvas = () => {
		const { width, height } = canvasRef.current;
		ctx.clearRect(0, 0, width, height);
	};

	const saveCanvas = () => {
		if (!user) {
			return alert("Sign in or Sign up to save");
		}
		const dataURL = canvasRef.current.toDataURL();
		setPrevious(dataURL);
		dispatch(
			artActions.saveThunk({
				galleryId,
				name,
				description,
				dataURL,
			}),
		);
		clearCanvas();
	};

	const loadCanvas = () => {
		if (!user) {
			return alert("Sign in or Sign up to save");
		}
		const img = new Image();
		img.src = previous;
		ctx.drawImage(img, 0, 0);
	};

	useEffect(() => {
		if (!canvasRef.current) return;
		const canvas = canvasRef.current;
		canvas.width = 1000;
		canvas.height = 1000;
		const newCtx = canvasRef.current.getContext("2d");
		newCtx.strokeStyle = "#000000";
		setCtx(newCtx);
	}, []);

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
			<h1>CANVAS HOME</h1>
			<div>
				<canvas
					ref={canvasRef}
					id="CanvasHome"
					style={{ border: "1px solid black" }}
				/>
			</div>
			<button onClick={clearCanvas}>Clear</button>
			<button onClick={saveCanvas}>Save</button>
			<button onClick={loadCanvas}>Load</button>
			<OpenModalButton
				buttonText="Load Saves"
				modalComponent={<LoadArtModal myArt={myArt} />}
			/>
		</>
	);
}
