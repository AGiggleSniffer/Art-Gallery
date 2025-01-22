import {
	BsBrushFill,
	BsBucketFill,
	BsEraserFill,
	BsPencilFill,
	BsPlus,
} from "react-icons/bs";
import { GiSpray } from "react-icons/gi";
import Tool from "./Tool";
import {
	BRUSH,
	BUCKET,
	ERASER,
	PENCIL,
	PIXEL,
	SPRAY,
} from "../../hooks/DrawingStyles";

export default function Toolbar({
	context: { style, setStyle, setColor, size, setSize },
	...props
}) {
	return (
		<div {...props}>
			<div className="flex justify-center m-2 text-xs font-bold">
				Tools
			</div>
			<div className="m-1 absolute left-full top-0 w-64 bg-black/30 p-1 px-2 rounded-full">
				<label className="flex items-center text-nowrap text-xs justify-evenly">
					<div className="w-20">Line Width: {size}</div>
					<input
						className="cursor-pointer ml-2"
						type="range"
						min="1"
						max="9"
						defaultValue="1"
						onChange={(e) => {
							setSize(e.target.value);
						}}
					/>
				</label>
			</div>
			<div className="grid grid-cols-1 justify-items-center cursor-pointer">
				<Tool
					isSelected={style === BRUSH}
					onButtonClick={() => setStyle(BRUSH)}
				>
					<BsBrushFill
						className="w-full h-full p-4"
					/>
				</Tool>
				<Tool
					isSelected={style === PIXEL}
					onButtonClick={() => setStyle(PIXEL)}
				>
					<BsPlus className="w-full h-full p-1" />
				</Tool>
				<Tool
					isSelected={style === PENCIL}
					onButtonClick={() => setStyle(PENCIL)}
				>
					<BsPencilFill className="w-full h-full p-4" />
				</Tool>
				<Tool
					isSelected={style === BUCKET}
					onButtonClick={() => setStyle(BUCKET)}
				>
					<BsBucketFill className="w-full h-full p-4" />
				</Tool>
				<Tool
					isSelected={style === SPRAY}
					onButtonClick={() => setStyle(SPRAY)}
				>
					<GiSpray className="w-full h-full p-4" />
				</Tool>
				<Tool
					isSelected={style === ERASER}
					onButtonClick={() => setStyle(ERASER)}
				>
					<BsEraserFill className="w-full h-full p-4" />
				</Tool>

				<div className="p-4 h-full w-full">
					<label className="flex items-center justify-center">
						<input
							className="cursor-pointer rounded w-full h-8"
							type="color"
							onChange={(e) => {
								setColor(e.target.value);
							}}
						/>
					</label>
				</div>
			</div>
		</div>
	);
}
