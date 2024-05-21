import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as artActions from "../../store/art";

export default function AllArtView() {
	const navigate = useNavigate();

	const allArts = useSelector(artActions.allArtArr);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(artActions.loadAllThunk());
	}, [dispatch]);

	return (
		<>
			<div id="Selection">
				{allArts.map((art) => {
					return (
						<div key={art.id}>
							<figure>
								<img
									src={art.data_url}
									onClick={() => navigate(`/arts/${art.id}`)}
								/>
							</figure>
						</div>
					);
				})}
			</div>
		</>
	);
}
