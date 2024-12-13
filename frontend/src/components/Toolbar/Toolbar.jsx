import { useEffect, useState } from "react";
import {
	BsBan,
	BsBrushFill,
	BsBucketFill,
	BsEraserFill,
	BsPencilFill,
	BsPlus,
} from "react-icons/bs";
import { GiSpray } from "react-icons/gi";

export default function Toolbar({ ctx, ...props }) {
	const [color, setColor] = useState("#000000");
	const [line, setLine] = useState(1);

	const clearCanvas = () => {
		const { width, height } = ctx.canvas;
		ctx.clearRect(0, 0, width, height);
	};

	useEffect(() => {
		if (!ctx) return;
		ctx.lineWidth = line;
		ctx.strokeStyle = color;
	}, [ctx, color, line]);

	return (
		<div {...props}>
			<div className="flex justify-center m-2 text-xs font-bold">
				Tools
			</div>
			<div className="m-4 mt-0">
				<label className="mt-0 flex flex-col items-center">
					Line Width: {line}
					<input
						className="cursor-pointer w-full"
						type="range"
						min="0"
						max="9"
						defaultValue="1"
						onChange={(e) => {
							setLine(e.target.value);
						}}
					/>
				</label>
			</div>
			<div className="grid grid-cols-2 justify-items-center cursor-pointer">
				<BsPencilFill className="hover:bg-neutral-500 rounded-md w-full h-full p-4" />
				<BsPlus className="hover:bg-neutral-500 rounded-md w-full h-full" />
				<BsBrushFill className="hover:bg-neutral-500 rounded-md w-full h-full p-4" />
				<BsEraserFill className="hover:bg-neutral-500 rounded-md w-full h-full p-4" />
				<BsBucketFill className="hover:bg-neutral-500 rounded-md w-full h-full p-4" />
				<GiSpray className="hover:bg-neutral-500 rounded-md w-full h-full p-4" />
			</div>
			<div className="m-4">
				<label className="flex items-center justify-center">
					<input
						className="mr-2 cursor-pointer"
						type="color"
						onChange={(e) => {
							setColor(e.target.value);
						}}
					/>
					Color
				</label>
			</div>
			<div className="m-4">
				<button
					onClick={clearCanvas}
					className="flex items-center justify-center w-full"
				>
					<BsBan className="mr-2" />
					Clear
				</button>
			</div>
			{/* <div className="m-4">
				{user ? (
					<OpenModalButton
						buttonText="Save"
						icon={<VscSaveAs className="mr-2" />}
						modalComponent={
							<SaveArtModal ctx={ctx} navigate={navigate} />
						}
					/>
				) : (
					<OpenModalButton
						buttonText="Save"
						icon={<VscSaveAs className="mr-2" />}
						modalComponent={
							<SignupFormModal extraMessage="Sign in or Sign up to Save As" />
						}
					/>
				)}
			</div> */}
		</div>
	);
}
