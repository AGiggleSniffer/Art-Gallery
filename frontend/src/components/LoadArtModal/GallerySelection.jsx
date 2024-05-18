export default function GallerySelection({ galleryArr }) {
	return (
		<>
			{galleryArr.map((item) => {
				<div key={item.id}>{item.id}</div>;
			})}
		</>
	);
}
