import { useDispatch } from "react-redux";

import * as galleryActions from "../../store/gallery";

export default function DeleteGalModal({ id, navigate }) {
	const dispatch = useDispatch();

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

		deleteArt();

		navigate("/");
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Are you sure you want to delete this Gallery?</h2>
			<p>Warning! This CAN NOT be undone.</p>
			<span>
				<button className="classic">
					Cancel
				</button>
				<button className="classic" type="submit">
					Yes
				</button>
			</span>
		</form>
	);
}
