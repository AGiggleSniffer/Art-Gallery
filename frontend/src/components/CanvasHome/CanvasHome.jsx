import { useRef } from "react";
import { useSelector } from "react-redux";

import * as sessionActions from "../../store/session";

import useCanvasCtx from "../../hooks/useCanvasCtx";

import Toolbar from "../Toolbar";

export default function CanvasHome() {
	const user = useSelector(sessionActions.user);
	const canvasRef = useRef(null);
	const ctx = useCanvasCtx(canvasRef);

	return (
		<div className="flex h-full overflow-hidden border-t border-black">
			<Toolbar ctx={ctx} user={user} className="bg-neutral-700 select-none" />
			<div className="w-full flex justify-center items-center">
				<div className="w-[95%] max-w-[75vh]">
					<canvas className="bg-white" ref={canvasRef} />
				</div>
			</div>
			{/* <div className="flex flex-col p-5 bg-neutral-700">
				<input className="m-5"></input>
				<input className="m-5"></input>
				<input className="m-5"></input>
			</div> */}
		</div>
	);
}
