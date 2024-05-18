import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as artActions from "../../store/art";
import "./CanvasSave.css";

export default function SaveArtModal({ canvasRef, id }) {
	const myArt = useSelector(artActions.findArt(id));
	const [galleryId] = useState(null);
	const [description, setDescription] = useState("");
	const [name, setName] = useState("");
	const [tags, setTags] = useState("");
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const saveCanvas = async () => {
		const dataURL = await canvasRef.current.toDataURL();
		console.log(tags);

		try {
			if (id) {
				await dispatch(
					artActions.editThunk({
						galleryId,
						name,
						description,
						dataURL,
						id,
					}),
				);
			} else {
				await dispatch(
					artActions.saveThunk({
						galleryId,
						name,
						description,
						dataURL,
					}),
				);
			}

			closeModal();
		} catch (err) {
			const data = await err.json();
			if (data?.errors) {
				setErrors(data.errors);
			}
			console.log(errors)
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		saveCanvas();
	};

	return (
		<form onSubmit={handleSubmit}>
			<span>
				Name Your Art:{" "}
				<input
					type="text"
					onChange={(e) => setName(e.target.value)}
					defaultValue={myArt?.name}
				/>
			</span>
			<div>
				Description:{" "}
				<input
					type="text"
					onChange={(e) => setDescription(e.target.value)}
					defaultValue={myArt?.description}
				/>
			</div>
			<div>
				Add Tags to help people find your art:{" "}
				<input
					type="text"
					onChange={(e) => setTags(e.target.value)}
					defaultValue={myArt?.tags}
				/>
			</div>
			<button className="classic" type="submit">
				Save As
			</button>
		</form>
	);
}
