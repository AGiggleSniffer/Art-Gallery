export default function GallerySelection({ galleryArr, navigate, closeModal }) {
	return (
		<>
			<div id="Selection">
				{galleryArr.map((item) => {
					return (
						<div
							key={item.id}
							id="Selection__galleryCard"
							onClick={() => {
								navigate(`/galleries/${item.id}`);
								closeModal();
							}}
						>
							<p>{item.name}</p>
							<p>Images: {item.ArtGalleries.length}</p>
						</div>
					);
				})}
			</div>
		</>
	);
}
