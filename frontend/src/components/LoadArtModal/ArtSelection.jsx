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
			<div id="ArtSelection">
				{visible && (
					<OpenModalButton
						buttonText="save"
						modalComponent={<GalleryFormModal handleSubmit={handleSubmit} />}
					/>
				)}
				{!visible ? (
					<button className="classic" onClick={toggleVisible}>
						Create new Gallery
					</button>
				) : (
					<button className="classic" onClick={toggleVisible}>
						Cancel
					</button>
				)}
				{artArray.map((art, i) => {
					return (
						<div key={art.id} className={visible ? "checkActive" : null}>
							{visible ? (
								<label>
									<img src={art.data_url} />
									<input
										type="checkbox"
										value={art.id}
										onChange={handleCheck(i)}
									/>
								</label>
							) : (
								<label>
									<img
										src={art.data_url}
										onClick={() => {
											navigate(`/art/${art.id}`);
											closeModal();
										}}
									/>
								</label>
							)}
						</div>
					);
				})}
			</div>
		</>
	);
}
