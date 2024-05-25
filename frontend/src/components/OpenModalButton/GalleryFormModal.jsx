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
			<h1>Save Gallery</h1>
			<div>
				<label style={{ top: name ? 0 : "" }} htmlFor="name">
					Name Your Gallery:
				</label>
				<input
					id="name"
					type="text"
					onChange={(e) => setName(e.target.value)}
					defaultValue={myGal?.name}
					required
				/>
			</div>
			{errors.name && <p>{errors.name}</p>}
			<div>
				<label style={{ top: description ? 0 : "" }} htmlFor="description">
					Description:
				</label>
				<input
					id="description"
					type="text"
					onChange={(e) => setDescription(e.target.value)}
					defaultValue={myGal?.description}
				/>
			</div>
			{errors.description && <p>{errors.description}</p>}
			<div>
				<label
					style={tags ? { top: tags ? 0 : "" } : { display: "none" }}
					htmlFor="tags"
				>
					Tags:
				</label>
				<textarea
					id="tags"
					placeholder="Add Tags to help people find your Gallery:"
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
