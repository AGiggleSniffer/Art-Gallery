import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as galleryActions from "../../store/gallery";
import "./Gallery.css";

export default function GalleryHome() {
	const navigate = useNavigate();

	const galleries = useSelector(galleryActions.allGalleryArr);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(galleryActions.getAllGalleries());
	}, [dispatch]);

	return (
		<>
			<div id="Selection">
				{galleries.map(({ id, name, ArtGalleries }) => {
					return (
						<span
							key={id}
							id="Selection__galleryCard"
							onClick={() => navigate(`/galleries/${id}`)}
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
											<img src={Art.data_url} />
											<h3>{Art.name}</h3>
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
