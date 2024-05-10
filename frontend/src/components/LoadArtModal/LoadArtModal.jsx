import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as artActions from "../../store/art";
import "./LoadArt.css";

export default function LoadArtModal() {
	const dispatch = useDispatch();
	const myArt = useSelector((state) => state.art.myArt);

	useEffect(() => {
		dispatch(artActions.loadThunk());
	}, [dispatch]);

	return (
		<>
			<div id="LoadArt">
				<h1>Select Art to Load</h1>
				{myArt?.map((art) => {
					return <img key={art.id} src={art.data_url} />;
				})}
			</div>
		</>
	);
}
