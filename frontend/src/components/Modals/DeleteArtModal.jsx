import { useDispatch } from "react-redux";
import * as artActions from "../../store/art";

export default function DeleteArtModal({ navigate, id }) {
	const dispatch = useDispatch();

	const deleteArt = async () => {
		try {
			const res = await dispatch(artActions.deleteArtThunk(id));

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
			<h2>Are you sure you want to delete this art?</h2>
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
