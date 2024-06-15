import { useEffect, useState } from "react";
import { BsPlusCircle, BsBan } from "react-icons/bs";
import { VscSave } from "react-icons/vsc";
import OpenModalButton from "../OpenModalButton";
import GalleryFormModal from "../GalleryFormModal";

export default function ArtSelection({ navigate, closeModal, artArray }) {
	const [visible, setVisible] = useState(false);
	const [checked, setChecked] = useState([]);

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

	useEffect(() => {
		setChecked(new Array(artArray.length).fill(false));
	}, [artArray]);

	return (
		<>
			<div id="Selection">
				<section id="Selection__buttons">
					{visible && (
						<OpenModalButton
							buttonText="Save"
							icon={<VscSave />}
							modalComponent={<GalleryFormModal handleSubmit={handleSubmit} />}
						/>
					)}
					{!visible ? (
						<button className="classic" onClick={toggleVisible}>
							<BsPlusCircle />
							Create Gallery
						</button>
					) : (
						<button className="classic" onClick={toggleVisible}>
							<BsBan />
							Cancel
						</button>
					)}
				</section>
				{artArray.map(({ id, name, data_url }, i) => {
					return (
						<span key={id}>
							<div className={visible ? "checkActive" : null}>
								{visible ? (
									<label>
										<figure>
											<img src={data_url} />
											<input
												type="checkbox"
												value={id}
												onChange={handleCheck(i)}
											/>
											<h3>{name}</h3>
										</figure>
									</label>
								) : (
									<figure>
										<img
											src={data_url}
											onClick={() => {
												navigate(`/arts/${id}`);
												closeModal();
											}}
										/>
										<h3>{name}</h3>
									</figure>
								)}
							</div>
						</span>
					);
				})}
			</div>
		</>
	);
}
