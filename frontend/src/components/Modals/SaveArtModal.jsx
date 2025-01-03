import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as artActions from "../../store/art";
import ErrorDisplay from "./ErrorDisplay";
import { context } from "../../store/session";
import { BsArrowLeft } from "react-icons/bs";
import { useModal } from "../../context/ModalProvider";
import { useNavigate, useParams } from "react-router-dom";

export default function SaveArtModal() {
	const navigate = useNavigate();
	const { id } = useParams();
	const sessionContext = useSelector(context);
	const [data, setData] = useState("");
	const [description, setDescription] = useState("");
	const [name, setName] = useState("");
	const [tags, setTags] = useState("");
	const [errors, setErrors] = useState({});
	const { close } = useModal();

	const dispatch = useDispatch();
	const saveCanvas = async () => {
		const formattedTags = tags.replaceAll("#", "").split(" ");

		const payload = {
			name,
			description,
			dataURL: data,
			tags: formattedTags,
		};

		try {
			const { id: newId } = await dispatch(artActions.saveThunk(payload));
			navigate(`/arts/${newId}`);
			close();
		} catch (err) {
			const data = await err.json();
			if (data?.errors) {
				setErrors(data.errors);
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		saveCanvas();
	};

	useEffect(() => {
		setData(sessionContext?.ctx.canvas.toDataURL());
	}, [sessionContext]);

	return (
		<div
			key="loginForm"
			className="lg:grid lg:rounded-lg overflow-hidden grid-cols-3 w-full"
		>
			<div className="lg:flex flex-col hidden justify-center items-center bg-black p-2">
				<img
					src={data}
					className="object-contain image h-fit w-full bg-[url('/cream-paper.png')] pixelated bg-white"
				/>
				<p className="py-2">Preview</p>
			</div>
			<form
				onSubmit={handleSubmit}
				className="col-span-2 flex flex-col gap-2 items-center bg-neutral-700 p-6 shadow-lg h-svh w-svw lg:h-full lg:w-full"
			>
				<div className="md:text-4xl text-2xl absolute top-6 left-6 lg:hidden">
					<BsArrowLeft className="cursor-pointer" onClick={close} />
				</div>
				<div className="flex flex-col items-center justify-center gap-2 my-8 lg:m-4">
					<img src="/Icon.png" className="h-20 w-fit lg:h-12" />
					<h1 className="text-4xl font-bold text-center">Save Art</h1>
				</div>
				<div className="w-full h-full flex flex-col gap-2 md:px-12 lg:px-0 text-xl">
					<div className="flex flex-col w-full">
						<label htmlFor="name">Name Your Art:</label>
						<input
							className="rounded text-black p-2"
							id="name"
							type="text"
							onChange={(e) => setName(e.target.value)}
							defaultValue={name}
							required
						/>
					</div>
					{errors.name && <ErrorDisplay msg={errors.name} />}
					<div className="flex flex-col w-full">
						<label htmlFor="description">Description:</label>
						<input
							className="rounded text-black p-2"
							id="description"
							type="text"
							onChange={(e) => setDescription(e.target.value)}
							defaultValue={description}
						/>
					</div>
					{errors.description && (
						<ErrorDisplay msg={errors.description} />
					)}
					<div className="flex flex-col w-full">
						<label htmlFor="tags">Tags:</label>
						<textarea
							className="rounded text-black p-2"
							id="tags"
							placeholder="Add Tags to help people find your art:"
							onChange={(e) => setTags(e.target.value)}
							defaultValue={""}
						/>
					</div>
					{errors.type && <ErrorDisplay msg={errors.type} />}
					<div>
						<p className="text-nowrap text-sm">
							{
								'(tags will be seperated by spaces. "#\'s" will be ignored)'
							}
						</p>
					</div>
					<div className="flex flex-col w-full">
						<button
							className="purple-gradient w-full mt-6 rounded py-2"
							type="submit"
						>
							Save As
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
