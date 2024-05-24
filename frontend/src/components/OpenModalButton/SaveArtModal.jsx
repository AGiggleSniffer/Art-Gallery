import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as artActions from "../../store/art";

export default function SaveArtModal({ canvasRef, id, navigate }) {
	const myArt = useSelector(artActions.findArt(id));
	const [description, setDescription] = useState(myArt?.description);
	const [name, setName] = useState(myArt?.name);
	const [tags, setTags] = useState(myArt?.tags);
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const saveCanvas = async () => {
		const dataURL = await canvasRef.current.toDataURL();
		const payload = {
			name,
			description,
			dataURL,
			id,
			tags,
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
			<div>
				Name Your Art:{" "}
				<input
					type="text"
					onChange={(e) => setName(e.target.value)}
					defaultValue={myArt?.name}
				/>
			</div>
			{errors.name && <p>{errors.name}</p>}
			<div>
				Description:{" "}
				<input
					type="text"
					onChange={(e) => setDescription(e.target.value)}
					defaultValue={myArt?.description}
				/>
			</div>
			{errors.description && <p>{errors.description}</p>}
			<div>
				Add Tags to help people find your art:{" "}
				<input
					type="text"
					onChange={(e) => setTags(e.target.value)}
					defaultValue={myArt?.tags}
				/>
			</div>
			{errors.tags && <p>{errors.tags}</p>}
			<button className="classic" type="submit">
				Save As
			</button>
		</form>
	);
}