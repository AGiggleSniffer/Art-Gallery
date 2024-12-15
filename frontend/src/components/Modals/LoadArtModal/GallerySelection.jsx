export default function GallerySelection({ galleryArr, navigate, closeModal }) {
	return (
		<>
			<div id="Selection">
				{galleryArr.map(({ id, name, ArtGalleries }) => {
					return (
						<span
							key={id}
							id="Selection__galleryCard"
							onClick={() => {
								navigate(`/galleries/${id}`);
								closeModal();
							}}
						>
							<h2>{name}</h2>
							{ArtGalleries?.map(({ id, Art }, i) => {
								if (i > 4) return null;
								return (
									<div
										key={id}
										style={{ bottom: `${i * 5}px`, right: `${i * 5}px` }}
									>
										<figure>
											<img src={Art?.data_url} />
											<h3>{Art?.name}</h3>
										</figure>
									</div>
								);
							})}
						</span>
					);
				})}
			</div>
		</>
	);
}
