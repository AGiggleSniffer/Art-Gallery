import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as artActions from "../../store/art";
import * as galleryActions from "../../store/gallery";
import ArtSelection from "./ArtSelection";
import GallerySelection from "./GallerySelection";
import "./LoadArt.css";

export default function LoadArtModal({ navigate }) {
	const dispatch = useDispatch();
	const artArray = useSelector(artActions.ownedArt);
	const galleryArr = useSelector(galleryActions.ownedGalleries);
	const { closeModal } = useModal();

	const [visible, setVisible] = useState(true);

	useEffect(() => {
		dispatch(artActions.loadThunk());
		dispatch(galleryActions.getOwnedGalleries());
	}, [dispatch]);

	return (
		<>
			<div id="LoadArt">
				<button className="classic exit" onClick={closeModal}>
					X
				</button>
				<h2>
					<span
						className={visible ? "active" : null}
						onClick={() => setVisible(true)}
					>
						ARTS
					</span>
					<span
						className={!visible ? "active" : null}
						onClick={() => setVisible(false)}
					>
						GALLERIES
					</span>
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
