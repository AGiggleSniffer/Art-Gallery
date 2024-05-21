import { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import GalleryFormModal from "../GalleryFormModal";

export default function ArtSelection({ navigate, closeModal, artArray }) {
	const [visible, setVisible] = useState(false);
	const [checked, setChecked] = useState(
		new Array(artArray.length).fill(false),
	);

	const resetChecked = () => setChecked(new Array(artArray.length).fill(false));

	const toggleVisible = () => {
		setVisible(!visible);
		resetChecked();
	};

	const handleCheck = (i) => () => {
		const updatedState = checked.map((item, idx) => (idx === i ? !item : item));
		setChecked(updatedState);
	};

	const handleSubmit = () => {
		const selectedArt = checked
			.map((ele, i) => (ele ? artArray[i].id : ele))
			.filter((ele) => ele);

		toggleVisible();
		resetChecked();

		return selectedArt;
	};

	return (
		<>
			<div id="Selection">
				<section id="Selection__buttons">
					{visible && (
						<OpenModalButton
							buttonText="Save To Gallery"
							modalComponent={<GalleryFormModal handleSubmit={handleSubmit} />}
						/>
					)}
					{!visible ? (
						<button className="classic" onClick={toggleVisible}>
							Edit Your Art
						</button>
					) : (
						<button className="classic" onClick={toggleVisible}>
							Cancel
						</button>
					)}
				</section>
				{artArray.map((art, i) => {
					return (
						<div key={art.id} className={visible ? "checkActive" : null}>
							{visible ? (
								<label>
									<figure>
										<img src={art.data_url} />
										<input
											type="checkbox"
											value={art.id}
											onChange={handleCheck(i)}
										/>
									</figure>
								</label>
							) : (
								<figure>
									<img
										src={art.data_url}
										onClick={() => {
											navigate(`/arts/${art.id}`);
											closeModal();
										}}
									/>
								</figure>
							)}
						</div>
					);
				})}
			</div>
		</>
	);
}
