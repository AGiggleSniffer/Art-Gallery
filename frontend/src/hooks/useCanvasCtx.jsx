import { useEffect, useState } from "react";

export default function useCanvasCtx(ref, myArt) {
	const [ctx, setCtx] = useState(null);

	useEffect(() => {
		if (!ref.current) return;

		const canvas = ref.current;
		canvas.width = 1280;
		canvas.height = 720;
		const newCtx = ref.current.getContext("2d");
		newCtx.strokeStyle = "#000000";

		if (myArt) {
			const img = new Image();
			img.src = myArt?.data_url;
			newCtx.drawImage(img, 0, 0);
		}

		setCtx(newCtx);
	}, [ref, myArt]);

	return ctx;
}
