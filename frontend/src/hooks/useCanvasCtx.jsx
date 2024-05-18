import { useEffect, useState } from "react";

export default function useCanvasCtx(ref, myArt) {
	const [ctx, setCtx] = useState(null);
	const [isPainting, setIsPainting] = useState(false);

	useEffect(() => {
		if (!ref.current) return;

		const canvas = ref.current;
		canvas.width = 1280;
		canvas.height = 720;
		const newCtx = ref.current.getContext("2d");

		if (myArt) {
			const img = new Image();
			img.src = myArt?.data_url;
			newCtx.drawImage(img, 0, 0);
		}

		setCtx(newCtx);
	}, [ref, myArt]);

	useEffect(() => {
		if (!ref.current) return;

		const canvas = ref.current;

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
	}, [ref, ctx, isPainting]);

	return ctx;
}
