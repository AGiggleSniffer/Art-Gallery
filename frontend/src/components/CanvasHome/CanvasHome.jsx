import { useRef } from "react";

import useCanvasCtx from "../../hooks/useCanvasCtx";

import Toolbar from "../Toolbar";

export default function CanvasHome() {
	const canvasRef = useRef(null);
	const { style, setStyle, setColor, size, setSize } =
		useCanvasCtx(canvasRef);

	return (
		<div className="flex overflow-hidden border-t border-black h-full flex-grow">
			<Toolbar
				context={{ style, setStyle, setColor, size, setSize }}
				className="bg-neutral-600/50 select-none w-16 flex-shrink-0 relative"
			/>
			<div className="w-full flex flex-col justify-center items-center border-l border-black">
				<div className="w-[95%] max-w-[75vh]">
					<canvas
						className="bg-[url('/cream-paper.png')] bg-white"
						ref={canvasRef}
					/>
				</div>
			</div>
		</div>
	);
}
