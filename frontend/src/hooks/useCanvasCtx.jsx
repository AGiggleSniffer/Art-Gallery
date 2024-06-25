import { useEffect, useState } from "react";

export default function useCanvasCtx(ref) {
	const [ctx, setCtx] = useState(null);
	const [isPainting, setIsPainting] = useState(false);

	useEffect(() => {
		if (!ref.current) return;

		const canvas = ref.current;
		canvas.width = 800;
		canvas.height = 600;
		const newCtx = ref.current.getContext("2d");

		setCtx(newCtx);
	}, [ref]);

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
		window.addEventListener("mouseup", mouseup);
		canvas.addEventListener("mousemove", draw);

		canvas.addEventListener("touchstart", mousedown);
		window.addEventListener("touchend", mouseup);
		canvas.addEventListener("touchmove", draw);

		return () => {
			canvas.removeEventListener("mousedown", mousedown);
			window.removeEventListener("mouseup", mouseup);
			canvas.removeEventListener("mousemove", draw);

			canvas.removeEventListener("touchstart", mousedown);
			window.removeEventListener("touchend", mouseup);
			canvas.removeEventListener("touchmove", draw);
		};
	}, [ref, ctx, isPainting]);

	return ctx;
}
