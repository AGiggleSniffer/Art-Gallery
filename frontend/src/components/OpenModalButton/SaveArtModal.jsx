import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as artActions from "../../store/art";
import ErrorDisplay from "./ErrorDisplay";

export default function SaveArtModal({ canvasRef, id, navigate }) {
	const myArt = useSelector(artActions.findArt(id));
	const formattedTagArr = myArt?.ArtTags.map(({ type }) => type).join(" ");
	const [description, setDescription] = useState(myArt?.description || "");
	const [name, setName] = useState(myArt?.name || "");
	const [tags, setTags] = useState(formattedTagArr || "");
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const saveCanvas = async () => {
		const dataURL = await canvasRef.current.toDataURL();

		const formattedTags = tags.replaceAll("#", "").split(" ");

		const payload = {
			name,
			description,
			dataURL,
			id,
			tags: formattedTags,
		};

		try {
			if (id) {
				await dispatch(artActions.editThunk(payload));
				navigate(`/arts/${id}`);
			} else {
				const { id: newId } = await dispatch(artActions.saveThunk(payload));
				navigate(`/arts/${newId}`);
			}

			closeModal();
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

	return (
		<form onSubmit={handleSubmit}>
			<h1>Save Art</h1>
			<div>
				<label style={{ top: name ? 0 : "" }} htmlFor="name">
					Name Your Art:
				</label>
				<input
					id="name"
					type="text"
					onChange={(e) => setName(e.target.value)}
					defaultValue={myArt?.name}
					required
				/>
			</div>
			{errors.name && <ErrorDisplay msg={errors.name} />}
			<div>
				<label style={{ top: description ? 0 : "" }} htmlFor="description">
					Description:
				</label>
				<input
					id="description"
					type="text"
					onChange={(e) => setDescription(e.target.value)}
					defaultValue={myArt?.description}
				/>
			</div>
			{errors.description && <ErrorDisplay msg={errors.description} />}
			<div>
				<label
					style={tags ? { top: tags ? 0 : "" } : { display: "none" }}
					htmlFor="tags"
				>
					Tags:
				</label>
				<textarea
					id="tags"
					placeholder="Add Tags to help people find your art:"
					onChange={(e) => setTags(e.target.value)}
					defaultValue={formattedTagArr}
				/>
			</div>
			{errors.type && <ErrorDisplay msg={errors.type} />}
			<p>{'(tags will be seperated by spaces. "#\'s" will be ignored)'}</p>
			<button className="classic" type="submit">
				Save As
			</button>
		</form>
	);
}
