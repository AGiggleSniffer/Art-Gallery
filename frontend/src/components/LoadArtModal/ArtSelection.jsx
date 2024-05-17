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
					<div>
						<OpenModalButton
							buttonText="save"
							modalComponent={<GalleryFormModal handleSubmit={handleSubmit} />}
						/>
					</div>
				)}
				<div>
					{!visible ? (
						<button onClick={toggleVisible}>Create new Gallery</button>
					) : (
						<button onClick={toggleVisible}>Cancel</button>
					)}
				</div>
				{artArray.map((art, i) => {
					return (
						<div key={art.id}>
							<img
								src={art.data_url}
								onClick={() => {
									navigate(`/art/${art.id}`);
									closeModal();
								}}
							/>
							{visible && (
								<input
									type="checkbox"
									value={art.id}
									onChange={handleCheck(i)}
								/>
							)}
						</div>
					);
				})}
			</div>
		</>
	);
}
