import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as galleryActions from "../../store/gallery";

export default function GalleryFormModal({ id, handleSubmit }) {
	const myGal = useSelector(galleryActions.findGallery(id));
	const [description, setDescription] = useState(myGal?.description);
	const [name, setName] = useState(myGal?.name);
	const [tags, setTags] = useState(myGal?.tags);
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const saveGallery = async () => {
		console.log(tags);

		try {
			const payload = {
				artIdArray: handleSubmit ? handleSubmit() : undefined,
				description,
				name,
				id,
			};

			if (id) {
				await dispatch(galleryActions.editGallery(payload));
			} else {
				await dispatch(galleryActions.postGallery(payload));
			}

			closeModal();
		} catch (err) {
			const data = await err.json();
			if (data?.errors) {
				setErrors(data.errors);
			}
		}
	};

	const handleSave = (e) => {
		e.preventDefault();
		saveGallery();
	};

	return (
		<form onSubmit={handleSave}>
			<div>
				Name Your Gallery:{" "}
				<input
					required
					type="text"
					onChange={(e) => setName(e.target.value)}
					defaultValue={myGal?.name}
				/>
			</div>
			{errors.name && <p>{errors.name}</p>}
			<div>
				Description:{" "}
				<input
					required
					type="text"
					onChange={(e) => setDescription(e.target.value)}
					defaultValue={myGal?.description}
				/>
			</div>
			{errors.description && <p>{errors.description}</p>}
			<div>
				Add Tags to help people find your Gallery:{" "}
				<input
					type="text"
					onChange={(e) => setTags(e.target.value)}
					defaultValue={myGal?.tags}
				/>
			</div>
			{errors.tags && <p>{errors.tags}</p>}
			<button className="classic" type="submit">
				Save New Gallery
			</button>
		</form>
	);
}
