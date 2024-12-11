import { useCallback, useEffect, useState } from "react";

const CANVAS_WIDTH = 32;
const CANVAS_HEIGHT = 32;

export default function useCanvasCtx(ref) {
	const [isPainting, setIsPainting] = useState(false);
	const [canvas, setCanvas] = useState();
	const [ctx, setCtx] = useState();
	const [scale, setScale] = useState(1);

	const dpi = window.devicePixelRatio;

	const setSize = useCallback(() => {
		if (!canvas) return;
		const scaleFactor =
			canvas.parentNode.getBoundingClientRect().width / CANVAS_WIDTH;
		setScale(scaleFactor);
	}, [canvas]);

	useEffect(() => {
		setCanvas(ref.current);
		setCtx(ref.current?.getContext("2d"));
	}, [ref]);

	useEffect(() => {
		setSize();
	}, [setSize]);

	useEffect(() => {
		window.onresize = setSize;
	}, [setSize]);

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

		const mousedown = () => {
			setIsPainting(true);
		};

		const mouseup = () => {
			setIsPainting(false);

			ctx.stroke();
			ctx.beginPath();
		};

		const mousemove = (e) => {
			if (isPainting === true) {
				draw(e);
			}
		};

		const draw = (e) => {
			ctx.lineTo(e.offsetX / scale, e.offsetY / scale);
			ctx.stroke();
		};

		canvas.addEventListener("mousedown", mousedown);
		window.addEventListener("mouseup", mouseup);
		canvas.addEventListener("mousemove", mousemove);

		return () => {
			canvas.removeEventListener("mousedown", mousedown);
			window.removeEventListener("mouseup", mouseup);
			canvas.removeEventListener("mousemove", mousemove);
		};
	}, [canvas, ctx, isPainting, scale]);

	return ctx;
}
