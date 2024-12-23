import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "../../store/session";
import * as artActions from "../../store/art";

import useCanvasCtx from "../../hooks/useCanvasCtx";

import Toolbar from "../Toolbar";
import { useParams } from "react-router-dom";

export default function CanvasHome() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const user = useSelector(sessionActions.user);
	const currentArt = useSelector(artActions.findArt);
	const canvasRef = useRef(null);
	const context = useCanvasCtx(canvasRef);

	useEffect(() => {
		if (context) {
			dispatch(sessionActions.updateCtx(context));
		}
	}, [dispatch, context]);

	useEffect(() => {
		if (id) {
			dispatch(artActions.findOneArt(id));
		} else {
			dispatch(artActions.oneArt(null));
		}
	}, [dispatch, id]);

	useEffect(() => {
		if (currentArt && context) {
			const img = new Image();
			img.src = currentArt?.data_url;
			context.ctx.drawImage(img, 0, 0);
			dispatch(artActions.oneArt(null));
		}
	}, [context, currentArt, dispatch]);

	return (
		<div className="flex overflow-hidden border-t border-black h-full flex-grow">
			<Toolbar
				context={context}
				user={user}
				className="bg-neutral-600/50 select-none w-16 flex-shrink-0 relative"
			/>
			<div className="w-full flex justify-center items-center border-l border-black">
				<div className="w-[95%] max-w-[75vh]">
					<canvas
						className="bg-[url('./cream-paper.png')] bg-white"
						ref={canvasRef}
					/>
				</div>
			</div>
		</div>
	);
}
