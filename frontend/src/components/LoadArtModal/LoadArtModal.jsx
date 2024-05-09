import "./LoadArt.css";

export default function LoadArtModal({ myArt }) {
	return (
		<>
			<h1>Select Art to Load</h1>
			{myArt?.map((art) => {
				return <img key={art.id} src={art.bitmap} />;
			})}
		</>
	);
}
