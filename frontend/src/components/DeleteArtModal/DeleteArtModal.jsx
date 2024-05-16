import { useDispatch } from "react-redux";
import * as artActions from "../../store/art";
import { useModal } from "../../context/Modal";

export default function DeleteArtModal({ navigate, clear, id }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const deleteArt = async () => {
		try {
			const res = await dispatch(artActions.deleteArtThunk(id));

			clear();

			return res;
		} catch (err) {
			return err;
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
			<h2>Are you sure you want to delete this art</h2>
			<button onClick={() => closeModal()}>Cancel</button>
			<button type="submit">Yes</button>
		</form>
	);
}
