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
				{allArts.map(({ id, data_url, name }) => {
					return (
						<div key={id}>
							<figure>
								<img src={data_url} onClick={() => navigate(`/arts/${id}`)} />
								<h3>{name}</h3>
							</figure>
						</div>
					);
				})}
			</div>
		</>
	);
}
