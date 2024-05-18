import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as galleryActions from "../../store/gallery";

export default function GalleryFormModal({ handleSubmit }) {
	const [description, setDescription] = useState("");
	const [name, setName] = useState("");
	const [tags, setTags] = useState("");
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const saveGallery = async () => {
		const artIdArray = handleSubmit();
		console.log(tags)
		try {
			await dispatch(
				galleryActions.postGallery({
					artIdArray,
					description,
					name,
				}),
			);
			closeModal();
		} catch (err) {
			const data = await err.json();
			if (data?.errors) {
				setErrors(data.errors);
			}
			console.log(errors)
		}
	};

	const handleSave = (e) => {
		e.preventDefault();
		saveGallery();
	};

	return (
		<form onSubmit={handleSave}>
			<span>
				Name Your Gallery:{" "}
				<input required type="text" onChange={(e) => setName(e.target.value)} />
			</span>
			<div>
				Description:{" "}
				<input
					required
					type="text"
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div>
				Add Tags to help people find your Gallery:{" "}
				<input type="text" onChange={(e) => setTags(e.target.value)} />
			</div>
			<button className="classic" type="submit">
				Save New Gallery
			</button>
		</form>
	);
}
