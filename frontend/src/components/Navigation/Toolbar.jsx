import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Toolbar() {
	const [color, setColor] = useState("#000000");
	const [line, setLine] = useState(5);

	const ctx = useSelector((state) => state.session.ctx);

	useEffect(() => {
		if (!ctx) return;
		ctx.lineWidth = line;
		ctx.strokeStyle = color;
	}, [ctx, color, line]);

	return (
		<span id="Toolbar">
			<div style={{ color: `${color}` }}>
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
				<label>Line Width: {line}</label>
				<input
					type="range"
					min="0"
					max="20"
					defaultValue="5"
					onChange={(e) => {
						setLine(e.target.value);
					}}
				/>
			</div>
		</span>
	);
}
