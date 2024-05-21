import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as galleryActions from "../../store/gallery";

export default function GalleryHome() {
	const navigate = useNavigate();

	const galleries = useSelector(galleryActions.allGalleries);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(galleryActions.getAllGalleries());
	}, [dispatch]);

	return (
		<>
			<div id="Selection">
				{galleries.map((item) => {
					return (
						<div
							key={item.id}
							id="Selection__galleryCard"
							onClick={() => navigate(`/galleries/${item.id}`)}
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
