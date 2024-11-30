import { useEffect, useState } from "react";

export default function useCanvasCtx(ref) {
	const [isPainting, setIsPainting] = useState(false);
	const [canvas, setCanvas] = useState();
	const [ctx, setCtx] = useState();
	const [rect, setRect] = useState();
	const [baseDimension, setBaseDimension] = useState();
	const [source, setSource] = useState();

	const [img, setImg] = useState(new Image());

	const hiddenCanvas = document.createElement("canvas");
	const hiddenContext = hiddenCanvas.getContext("2d");

	useEffect(() => {
		setCanvas(ref.current);
	}, [ref]);

	useEffect(() => {
		if (!canvas) return;
		setCtx(canvas.getContext("2d"));
	}, [ctx, canvas]);

	useEffect(() => {
		if (!hiddenCanvas) return;
		hiddenCanvas.width = 32;
		hiddenCanvas.height = 32;
	}, [hiddenCanvas]);

	useEffect(() => {
		if (!canvas || !baseDimension) return;
		canvas.width = baseDimension;
		canvas.height = baseDimension;
	}, [canvas, baseDimension]);

	useEffect(() => {
		if (!canvas) return;
		setRect(canvas.parentNode.getBoundingClientRect());
	}, [canvas]);

	useEffect(() => {
		if (!rect) return;
		setBaseDimension(rect.height > rect.width ? rect.width : rect.height);
	}, [rect]);

	useEffect(() => {
		if (!canvas) return;
		setSource(canvas.toDataURL());
	}, [canvas]);

	useEffect(() => {
		img.onLoad = () => {
			canvas.width = baseDimension;
			canvas.height = baseDimension;
			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		};

		img.src = source;
	}, [baseDimension, canvas, ctx, img, source]);

	useEffect(() => {
		if (!canvas) return;

		const mousedown = (e) => {
			setIsPainting(true);
			draw(e);
		};

		const mouseup = (e) => {
			setIsPainting(false);
			draw(e);
		};

		const mousemove = (e) => {
			if (isPainting === true) {
				draw(e);
			}
		};

		const draw = (e) => {
			const ratio = canvas.width / hiddenCanvas.width;

			hiddenContext.fillRect(
				Math.floor(e.offsetX / ratio),
				Math.floor(e.offsetY / ratio),
				1,
				1,
			);

			setSource(hiddenCanvas.toDataURL());
		};

		canvas.addEventListener("mousedown", mousedown);
		canvas.addEventListener("mouseup", mouseup);
		canvas.addEventListener("mousemove", mousemove);

		canvas.addEventListener("touchstart", mousedown);
		canvas.addEventListener("touchend", mouseup);
		canvas.addEventListener("touchmove", mousemove);

		return () => {
			canvas.removeEventListener("mousedown", mousedown);
			canvas.removeEventListener("mouseup", mouseup);
			canvas.removeEventListener("mousemove", mousemove);

			canvas.removeEventListener("touchstart", mousedown);
			canvas.removeEventListener("touchend", mouseup);
			canvas.removeEventListener("touchmove", mousemove);
		};
	}, [
		baseDimension,
		canvas,
		ctx,
		hiddenCanvas,
		hiddenContext,
		img,
		isPainting,
		source,
	]);

	return ctx;
}
