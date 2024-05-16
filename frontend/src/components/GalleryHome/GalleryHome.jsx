import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as galleryActions from "../../store/gallery";

export default function GalleryHome() {
    const galleries = useSelector(galleryActions.allGalleries);
    
    const dispatch = useDispatch();
	useEffect(() => {
		dispatch(galleryActions.getAllGalleries());
	}, [dispatch]);

	return (
		<>
			<h2>Galleries</h2>
			{galleries.map((item) => {
				return <div key={item.id}>{item.id}</div>;
			})}
		</>
	);
}
