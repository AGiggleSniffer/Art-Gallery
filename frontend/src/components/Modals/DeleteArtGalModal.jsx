export default function DeleteArtGalModal({ handleSubmit }) {
	const handleFormSubmit = (e) => {
		e.preventDefault();

		try {
			handleSubmit();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<h2>Are you sure you want to delete selected art from gallery?</h2>
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
