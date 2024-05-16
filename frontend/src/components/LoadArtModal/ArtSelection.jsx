export default function ArtSelection({ navigate, closeModal, artArray }) {
	return artArray?.map((art) => {
		return (
			<img
				key={art.id}
				src={art.data_url}
				onClick={() => {
					navigate(`/art/${art.id}`);
					closeModal();
				}}
			/>
		);
	});
}
