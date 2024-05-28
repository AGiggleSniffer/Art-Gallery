import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as galleryActions from "../../store/gallery";
import * as sessionActions from "../../store/session";
import OpenModalButton, {
	DeleteGalModal,
	EditGalModal,
	GalleryFormModal,
} from "../OpenModalButton";
import DeleteArtGalModal from "../OpenModalButton/DeleteArtGalModal";

export default function GalleryView() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const myGallery = useSelector(galleryActions.findGallery(id));
	const user = useSelector(sessionActions.user);

	const [isOwner, setIsOwner] = useState(false);
	const [visible, setVisible] = useState(false);
	const [checked, setChecked] = useState(
		new Array(myGallery?.ArtGalleries.length).fill(false),
	);

	const resetChecked = () =>
		setChecked(new Array(myGallery?.ArtGalleries.length).fill(false));

	const toggleVisible = () => {
		setVisible(!visible);
		resetChecked();
	};

	const handleCheck = (i) => () => {
		const updatedState = checked.map((item, idx) => (idx === i ? !item : item));
		setChecked(updatedState);
	};

	const handleSubmit = () => {
		const artGalIdArr = checked
			.map((ele, i) => (ele ? myGallery?.ArtGalleries[i].id : ele))
			.filter((ele) => ele);

		toggleVisible();
		resetChecked();

		dispatch(galleryActions.deleteArtGalleries({ id, artGalIdArr }));
	};

	useEffect(() => {
		dispatch(galleryActions.getOneGallery(id));
	}, [dispatch, id]);

	useEffect(() => {
		setChecked(new Array(myGallery?.ArtGalleries.length).fill(false));
	}, [myGallery]);

	useEffect(() => {
		if (user && myGallery?.user_id === user?.id) {
			setIsOwner(true);
		} else {
			setIsOwner(false);
		}
	}, [myGallery, user]);

	return (
		<div>
			<div>{myGallery?.description}</div>
			{isOwner && (
				<div>
					{!visible ? (
						<>
							<button className="classic" onClick={toggleVisible}>
								Delete Art
							</button>
							<OpenModalButton
								buttonText="Delete Gallery"
								modalComponent={<DeleteGalModal id={id} navigate={navigate} />}
							/>
							<OpenModalButton
								buttonText="Edit Details"
								modalComponent={
									<GalleryFormModal id={id} navigate={navigate} />
								}
							/>
							<OpenModalButton
								buttonText="Add Art"
								modalComponent={<EditGalModal id={id} navigate={navigate} />}
							/>
						</>
					) : (
						<>
							<button className="classic" onClick={toggleVisible}>
								Cancel
							</button>
							<OpenModalButton
								buttonText="Delete Selected Art"
								modalComponent={
									<DeleteArtGalModal handleSubmit={handleSubmit} />
								}
							/>
						</>
					)}
				</div>
			)}
			<div id="Selection">
				{myGallery?.ArtGalleries?.map(({ Art, id }, i) => {
					return (
						<span key={id}>
							<div className={visible ? "checkActive" : null}>
								{visible ? (
									<label>
										<figure>
											<img src={Art.data_url} />
											<input
												type="checkbox"
												value={id}
												onChange={handleCheck(i)}
											/>
											<h3>{Art.name}</h3>
										</figure>
									</label>
								) : (
									<figure>
										<img
											src={Art.data_url}
											onClick={() => navigate(`/arts/${Art.id}`)}
										/>
										<h3>{Art.name}</h3>
									</figure>
								)}
							</div>
						</span>
					);
				})}
			</div>
		</div>
	);
}
