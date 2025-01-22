import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ArtView from "../ArtView";
import * as artActions from "../../store/art";
import * as sessionActions from "../../store/session.js";

const AllArtView = () => {
	const dispatch = useDispatch();
	const [filterState, setFilter] = useState("");
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(20);
	const sessionUser = useSelector(sessionActions.user);
	const allArts = useSelector(artActions.selectAllArtArr);

	useEffect(() => {
		dispatch(artActions.loadAllThunk({ filterState, page, size }));
	}, [dispatch, filterState, page, size, sessionUser]);

	return (
		<ArtView
			artArray={allArts}
			paginationOptions={{
				filterState: filterState,
				setFilter,
				page,
				setPage,
				size,
				setSize,
			}}
		/>
	);
};

export default AllArtView;
