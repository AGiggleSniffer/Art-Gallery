import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "../../store/session";

import useCanvasCtx from "../../hooks/useCanvasCtx";

import Toolbar from "../Toolbar";

export default function CanvasHome() {
	const dispatch = useDispatch();
	const user = useSelector(sessionActions.user);
	const canvasRef = useRef(null);
	const context = useCanvasCtx(canvasRef);

	useEffect(() => {
		dispatch(sessionActions.updateCtx(context));
	}, [dispatch, context]);

	return (
		<div className="flex overflow-hidden border-t border-black h-full flex-grow">
			<Toolbar
				context={context}
				user={user}
				className="bg-neutral-600/50 select-none w-16 flex-shrink-0 relative"
			/>
			<div className="w-full flex justify-center items-center border-l border-black">
				<div className="w-[95%] max-w-[75vh]">
					<canvas className="bg-white" ref={canvasRef} />
				</div>
			</div>
		</div>
	);
}
