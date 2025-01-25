import { useCallback, useEffect, useState } from "react";
import { BRUSH, PENCIL, PIXEL } from "./DrawingStyles";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../store/session";

const CANVAS_WIDTH = 100;
const CANVAS_HEIGHT = 100;

const draw = (e, ctx, style, size, color, scale) => {
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = size;

	let x;
	let y;
	if (e.touches) {
		const rect = e.target.getBoundingClientRect();
		x = ((e.touches[0].pageX - rect.left) / scale) * 2;
		y = ((e.touches[0].pageY - rect.top) / scale) * 2;
	} else {
		x = (e.offsetX / scale);
		y = (e.offsetY / scale);
	}

	switch (style) {
		case BRUSH:
			ctx.lineCap = "round";
			ctx.lineTo(x, y);
			ctx.stroke();
			break;
		case PENCIL:
			ctx.lineCap = "square";
			ctx.lineTo(x, y);
			ctx.stroke();
			break;
		case PIXEL:
			ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
			break;
	}
};

export default function useCanvasCtx(ref) {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [isPainting, setIsPainting] = useState(false);
	const [canvas, setCanvas] = useState();
	const [ctx, setCtx] = useState();
	const [scale, setScale] = useState(1);
	const [style, setStyle] = useState(BRUSH);
	const [size, setSize] = useState(1);
	const [color, setColor] = useState("#000000");

	const dpi = window.devicePixelRatio;

	const clearCanvas = useCallback(() => {
		if (!canvas) return;
		const { width, height } = canvas;
		ctx.clearRect(0, 0, width, height);
	}, [ctx, canvas]);

	const updateCanvas = useCallback(
		(dataUrl) => {
			if (!ctx) return;
			const img = new Image();
			img.src = dataUrl;
			ctx.drawImage(img, 0, 0);
		},
		[ctx],
	);

	const setCanvasSize = useCallback(() => {
		if (!canvas) return;
		const scaleFactor =
			canvas.parentNode.getBoundingClientRect().width / CANVAS_WIDTH;
		setScale(scaleFactor);
	}, [canvas]);

	useEffect(() => {
		clearCanvas();
	}, [clearCanvas, id]);

	useEffect(() => {
		setCanvas(ref.current);
		setCtx(ref.current?.getContext("2d"));
	}, [ref]);

	useEffect(() => {
		setCanvasSize();
		window.onresize = setCanvasSize;
	}, [setCanvasSize]);

	useEffect(() => {
		if (!canvas) return;
		canvas.height = CANVAS_HEIGHT * dpi;
		canvas.width = CANVAS_WIDTH * dpi;

		canvas.style.imageRendering = "pixelated";

		ctx.imageSmoothingEnabled = false;
		ctx.lineCap = "round";

		ctx.save();
		ctx.scale(dpi, dpi);
		ctx.restore();
	}, [canvas, dpi, ctx]);

	useEffect(() => {
		if (!canvas) return;
		canvas.style.height = `${CANVAS_HEIGHT * scale}px`;
		canvas.style.width = `${CANVAS_WIDTH * scale}px`;
	}, [canvas, scale]);

	useEffect(() => {
		if (!canvas) return;

		const mousedown = (e) => {
			e.stopPropagation();
			setIsPainting(true);

			draw(e, ctx, style, size, color, scale);
		};

		const mouseup = (e) => {
			e.stopPropagation();
			setIsPainting(false);

			ctx.stroke();
			ctx.beginPath();
		};

		const mousemove = (e) => {
			if (!isPainting) return;
			e.stopPropagation();

			draw(e, ctx, style, size, color, scale);
		};

		canvas.addEventListener("mousedown", mousedown);
		window.addEventListener("mouseup", mouseup);
		canvas.addEventListener("mousemove", mousemove);

		canvas.addEventListener("touchstart", mousedown);
		canvas.addEventListener("touchend", mouseup);
		canvas.addEventListener("touchmove", mousemove);

		return () => {
			canvas.removeEventListener("mousedown", mousedown);
			canvas.removeEventListener("mouseup", mouseup);
			canvas.removeEventListener("mousemove", mousemove);

			canvas.removeEventListener("touchstart", mousedown);
			window.removeEventListener("touchend", mouseup);
			canvas.removeEventListener("touchmove", mousemove);
		};
	}, [canvas, color, ctx, isPainting, scale, size, style]);

	useEffect(() => {
		dispatch(
			sessionActions.updateCtx({
				ctx,
				clearCanvas,
				style,
				setStyle,
				color,
				setColor,
				size,
				setSize,
				updateCanvas,
			}),
		);
	}, [clearCanvas, color, ctx, dispatch, size, style, updateCanvas]);

	return {
		ctx,
		clearCanvas,
		style,
		setStyle,
		color,
		setColor,
		size,
		setSize,
		updateCanvas,
	};
}
