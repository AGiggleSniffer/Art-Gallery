import { useCallback, useEffect, useMemo, useState } from "react";

export default function useCanvasCtx(ref) {
	const [isPainting, setIsPainting] = useState(false);
	const [canvas, setCanvas] = useState();
	const [ctx, setCtx] = useState();
	const [source, setSource] = useState();
	const [rect, setRect] = useState();
	const [baseDimension, setBaseDimension] = useState();
	const [hiddenCanvas, setHiddenCanvas] = useState();
	const [hiddenContext, setHiddenContext] = useState();
	const img = useMemo(() => new Image(), []);

	const renderImage = useCallback(() => {
		img.onload = () => {
			canvas.width = baseDimension;
			canvas.height = baseDimension;
			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		};

		img.src = source;
	}, [baseDimension, canvas, ctx, img, source]);

	const setSize = useCallback(() => {
		if (!canvas || !rect) return;
		setRect(canvas.parentNode.getBoundingClientRect());
		setBaseDimension(rect.height > rect.width ? rect.width : rect.height);
	}, [canvas, rect]);

	useEffect(() => {
		setCanvas(ref.current);
	}, [ref]);

	useEffect(() => {
		if (!canvas) return;
		setCtx(canvas.getContext("2d"));
	}, [canvas]);

	useEffect(() => {
		setHiddenCanvas(document.createElement("canvas"));
	}, []);

	useEffect(() => {
		if (!hiddenCanvas) return;
		setHiddenContext(hiddenCanvas.getContext("2d"));
		hiddenCanvas.width = 128;
		hiddenCanvas.height = 128;
	}, [hiddenCanvas]);

	useEffect(() => {
		if (!canvas || !baseDimension) return;
		canvas.width = baseDimension;
		canvas.height = baseDimension;
	}, [canvas, baseDimension]);

	useEffect(() => {
		window.onresize = () => {
			renderImage();
			setSize();
		};
	}, [renderImage, setSize]);

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

			renderImage();
		};

		canvas.addEventListener("mousedown", mousedown);
		window.addEventListener("mouseup", mouseup);
		canvas.addEventListener("mousemove", mousemove);

		canvas.addEventListener("touchstart", mousedown);
		window.addEventListener("touchend", mouseup);
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
		renderImage,
	]);

	return hiddenContext;
}
