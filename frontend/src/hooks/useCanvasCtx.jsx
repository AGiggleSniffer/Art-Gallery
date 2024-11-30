import { useEffect, useState } from "react";

export default function useCanvasCtx(ref) {
	const [ctx] = useState(ref.current?.getContext("2d"));
	const [isPainting, setIsPainting] = useState(false);
	const [baseDimension, setBaseDimension] = useState();
	const [rect, setRect] = useState();
	const [img] = useState(new Image());
	const [source, setSource] = useState(ref.current?.toDataURL());
	const [hiddenCanvas] = useState(document.createElement("canvas"));
	const [hiddenContext] = useState(hiddenCanvas.getContext("2d"));
	const setSize = () => {
		setRect(ref.current?.parentNode?.getBoundingClientRect());
		if (rect) {
			setBaseDimension(
				rect.height > rect.width ? rect.width : rect.height,
			);
		}
	};

	hiddenCanvas.width = 32;
	hiddenCanvas.height = 32;

	useEffect(() => {
		setSize();
	}, []);
	

	useEffect(() => {
		if (ctx) ctx.lineCap = "round";
	}, [ctx]);

	useEffect(() => {
		ref.current.width = baseDimension;
		ref.current.height = baseDimension;
	}, [ref, baseDimension]);

	useEffect(() => {
		if (!ref.current) return;

		const canvas = ref.current;

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
			if (!isPainting) return;
			const ratio = ref.current.width / hiddenCanvas.width;

			hiddenContext.fillRect(
				Math.floor(e.offsetX / ratio),
				Math.floor(e.offsetY / ratio),
				1,
				1,
			);

			setSource(hiddenCanvas.toDataURL());

			renderImage();
		};

		const renderImage = () => {
			img.onLoad = () => {
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(img, 0, 0, ref.current.width, ref.curent.height);
			};
			setSource(img.src);
		};

		const flexCanvasSize = () => {
			setSize();
			renderImage();
		};

		window.onresize = flexCanvasSize;

		canvas.addEventListener("mousedown", mousedown);
		window.addEventListener("mouseup", mouseup);
		canvas.addEventListener("mousemove", mousemove);

		canvas.addEventListener("touchstart", mousedown);
		window.addEventListener("touchend", mouseup);
		canvas.addEventListener("touchmove", mousemove);

		return () => {
			canvas.removeEventListener("mousedown", mousedown);
			window.removeEventListener("mouseup", mouseup);
			canvas.removeEventListener("mousemove", mousemove);

			canvas.removeEventListener("touchstart", mousedown);
			window.removeEventListener("touchend", mouseup);
			canvas.removeEventListener("touchmove", mousemove);
		};
	}, [ref, ctx, isPainting, hiddenCanvas, hiddenContext, img]);

	return ctx;
}
