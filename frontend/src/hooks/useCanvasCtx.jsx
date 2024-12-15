import { useCallback, useEffect, useState } from "react";

const CANVAS_WIDTH = 100;
const CANVAS_HEIGHT = 100;

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
			if (e.touches) {
				const rect = e.target.getBoundingClientRect();
				var offsetX = e.touches[0].pageX - rect.left;
				var offsetY = e.touches[0].pageY - rect.top;
			}
			if (isPainting === true) {
				ctx.lineTo(
					(offsetX / scale) * 2 || e.offsetX / scale,
					(offsetY / scale) * 2 || e.offsetY / scale,
				);
				ctx.stroke();
			}
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
	}, [canvas, ctx, isPainting, scale]);

	return ctx;
}
