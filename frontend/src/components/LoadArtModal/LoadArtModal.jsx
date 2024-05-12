import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as artActions from "../../store/art";
import "./LoadArt.css";

export default function LoadArtModal({ user, navigate }) {
	const dispatch = useDispatch();
	const myArt = useSelector((state) => state.art.myArt);
	const { closeModal } = useModal();

	useEffect(() => {
		dispatch(artActions.loadThunk());
	}, [dispatch]);

	return (
		<>
			<div id="LoadArt">
				<h1>Select Art to Load</h1>
				{!user && <h2>Sign in to see your Art</h2>}
				{myArt?.map((art) => {
					return (
						<img
							key={art.id}
							src={art.data_url}
							onClick={() => {
								navigate(`/art/${art.id}`);
								closeModal();
							}}
						/>
					);
				})}
			</div>
		</>
	);
}
