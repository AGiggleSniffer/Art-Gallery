import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import * as galleryActions from "../../store/gallery";

export default function DeleteGalModal({ id, navigate }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const deleteArt = async () => {
		try {
			const res = await dispatch(galleryActions.deleteGallery(id));
			return res;
		} catch (err) {
			console.error(err);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		closeModal();

		deleteArt();

		navigate("/");
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Are you sure you want to delete this Gallery?</h2>
			<button className="classic" onClick={() => closeModal()}>
				Cancel
			</button>
			<button className="classic" type="submit">
				Yes
			</button>
		</form>
	);
}
