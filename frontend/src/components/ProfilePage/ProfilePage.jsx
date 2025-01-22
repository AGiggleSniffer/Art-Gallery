import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ArtView from "../ArtView";
import * as artActions from "../../store/art";
import * as sessionActions from "../../store/session.js";

const ProfilePage = () => {
	const dispatch = useDispatch();
	const [filterState, setFilter] = useState("");
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(20);
	const sessionUser = useSelector(sessionActions.user);
	const allArts = useSelector(artActions.selectOwnedArtArr);

	useEffect(() => {
		dispatch(artActions.loadThunk({ filterState, page, size }));
	}, [dispatch, filterState, page, size, sessionUser]);

	return (
		<>
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
			>
				<div className="flex flex-col justify-center items-center py-6 px-4">
					<h1 className="text-3xl font-bold">
						Hi, {sessionUser.username}
					</h1>
					<p className="text-sm">View and Delete your Art</p>
				</div>
			</ArtView>
		</>
	);
};

export default ProfilePage;
