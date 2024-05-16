import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as artActions from "../../store/art";
import * as galleryActions from "../../store/gallery";
import "./LoadArt.css";
import ArtSelection from "./ArtSelection";
import GallerySelection from "./GallerySelection";

export default function LoadArtModal({ user, navigate }) {
	const dispatch = useDispatch();
	const artArray = useSelector(artActions.ownedArt);
	const galleryArr = useSelector(galleryActions.ownedGalleries);
	const { closeModal } = useModal();

	const [visible, setVisible] = useState(true);

	useEffect(() => {
		dispatch(artActions.loadThunk());
		dispatch(galleryActions.getAllGalleries());
	}, [dispatch]);

	return (
		<>
			<div id="LoadArt">
				<h1>Select Art to Load</h1>
				{!user && <h2>Sign in to see your Art</h2>}

				<h2>
					<span onClick={() => setVisible(true)}>ART</span>
					<span onClick={() => setVisible(false)}>GALLERY</span>
				</h2>

				{visible ? (
					<ArtSelection
						navigate={navigate}
						closeModal={closeModal}
						artArray={artArray}
					/>
				) : (
					<GallerySelection
						navigate={navigate}
						closeModal={closeModal}
						galleryArr={galleryArr}
					/>
				)}
			</div>
		</>
	);
}
