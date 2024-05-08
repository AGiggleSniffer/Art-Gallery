import { useEffect, useRef, useState } from "react";
import "./Canvas.css";

export default function CanvasHome() {
	const canvasRef = useRef(null);
	const [isPainting, setIsPainting] = useState(false);
	const [lineWidth, setLineWidth] = useState(5);
	const [ctx, setCtx] = useState(null);

	const clearCanvas = () => {
		const { width, height } = canvasRef.current;
		ctx.clearRect(0, 0, width, height);
	};

	useEffect(() => {
		if (!canvasRef.current) return;
        const canvas = canvasRef.current;
		const canvasOffsetX = canvas.offsetLeft;
		const canvasOffsetY = canvas.offsetTop;
		canvas.width = window.innerWidth - canvasOffsetX;
		canvas.height = window.innerHeight - canvasOffsetY;
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

			ctx.lineWidth = lineWidth;
			ctx.lineCap = "round";

			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke();
		};
		canvas.addEventListener("mousedown", mousedown);
		canvas.addEventListener("mouseup", mouseup);
		canvas.addEventListener("mousemove", draw);

		return () => {
			canvas.removeEventListener("mousedown", mousedown);
			canvas.removeEventListener("mouseup", mouseup);
			canvas.removeEventListener("mousemove", draw);
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
		</>
	);
}
