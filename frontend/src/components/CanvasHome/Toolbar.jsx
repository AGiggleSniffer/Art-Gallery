import { useEffect, useRef, useState } from "react";

export default function Toolbar({ ctx }) {
	const [color, setColor] = useState("#000000");
	const [line, setLine] = useState(5);
	const [mousePos, setmousePos] = useState({ x: 100, y: 100 });
	const [moving, setMoving] = useState(false);
	const dragRef = useRef(null);

	useEffect(() => {
		if (!ctx) return;
		ctx.lineWidth = line;
		ctx.strokeStyle = color;
	}, [ctx, color, line]);

	useEffect(() => {
		if (!dragRef.current) return;

		const drag = dragRef.current;

		const handleMove = (e) => {
			if (!moving) return;
			setmousePos({ x: e.clientX, y: e.clientY });
		};
		const handleDown = () => {
			setMoving(true);
		};
		const handleUp = () => {
			setMoving(false);
		};

		drag.addEventListener("mousedown", handleDown);
		drag.addEventListener("mouseup", handleUp);
		document.addEventListener("mousemove", handleMove);

		return () => {
			drag.removeEventListener("mousedown", handleDown);
			drag.removeEventListener("mouseup", handleUp);
			document.removeEventListener("mousemove", handleMove);
		};
	}, [dragRef, moving]);

	return (
		<div id="Toolbar" style={{ top: mousePos.y - 85, left: mousePos.x - 85 }}>
			<div>
				<label>
					<input
						type="color"
						onChange={(e) => {
							setColor(e.target.value);
						}}
					/>
					Color
				</label>
			</div>
			<div>
				<input
					type="range"
					min="0"
					max="10"
					defaultValue="5"
					onChange={(e) => {
						setLine(e.target.value);
					}}
				/>
			</div>
			<button className="classic" ref={dragRef} id="Toolbar__drag">
				Click to drag
			</button>
		</div>
	);
}
