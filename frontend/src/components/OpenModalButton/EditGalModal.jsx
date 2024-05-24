import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

import * as artActions from "../../store/art";
import * as galleryActions from "../../store/gallery";

export default function EditGalModal({ id }) {
	const dispatch = useDispatch();
	const artArray = useSelector(artActions.ownedArt);

	const { closeModal } = useModal();

	const [checked, setChecked] = useState([]);

	const resetChecked = () => setChecked(new Array(artArray.length).fill(false));

	const handleCheck = (i) => () => {
		const updatedState = checked.map((item, idx) => (idx === i ? !item : item));
		setChecked(updatedState);
	};

	const handleSubmit = () => {
		const selectedArt = checked
			.map((ele, i) => (ele ? artArray[i].id : ele))
			.filter((ele) => ele);

		resetChecked();
		closeModal();

		dispatch(galleryActions.addArtGalleries({ id, artIdArray: selectedArt }));
	};

	useEffect(() => {
		dispatch(artActions.loadThunk());
	}, [dispatch]);

	useEffect(() => {
		setChecked(new Array(artArray.length).fill(false));
	}, [artArray]);

	return (
		<div id="LoadArt">
			<h2>Select Art to ADD to Gallery</h2>
			<section id="Selection__buttons">
				<button className="classic" onClick={handleSubmit}>
					Add Art
				</button>
				<button className="classic" onClick={closeModal}>
					Cancel
				</button>
			</section>
			<div id="Selection">
				{artArray.map(({ id, name, data_url }, i) => {
					return (
						<span key={id}>
							<div>
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
							</div>
						</span>
					);
				})}
			</div>
		</div>
	);
}
