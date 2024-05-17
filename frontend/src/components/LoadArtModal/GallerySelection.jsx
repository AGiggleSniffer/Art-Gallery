export default function GallerySelection({ navigate, closeModal, galleryArr }) {
	return (
		<>
			{galleryArr.map((item) => {
				<div key={item.id}>{item.id}</div>;
			})}
		</>
	);
}
