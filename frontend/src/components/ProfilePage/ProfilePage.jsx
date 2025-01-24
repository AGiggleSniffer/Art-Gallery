import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ArtView from "../ArtView";
import * as artActions from "../../store/art";
import * as sessionActions from "../../store/session.js";

const ProfilePage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(sessionActions.user);
	const allArts = useSelector(artActions.selectOwnedArtArr);
	const [filterState, setFilter] = useState("");
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(20);
	const [selection, setSelection] = useState(new Set());
	const [isSelectable, setIsSelectable] = useState(false);

	const handleDelete = () => {
		selection.forEach(async (id) => {
			try {
				await dispatch(artActions.deleteArtThunk(id));
			} catch (err) {
				const error = await err.json(err);
				console.log(error);
			}
		});
	};

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
				setSelection={setSelection}
				isSelectable={isSelectable}
			>
				<div className="flex flex-col justify-center items-center pt-6">
					<h1 className="text-3xl font-bold">
						Hi, {sessionUser.username}
					</h1>
					<p className="text-sm">View and Delete your Art</p>
					<div className="flex justify-between w-full mt-6">
						<label className="flex items-center p-1 pl-0">
							Select:
							<input
								className="ml-2"
								type="checkbox"
								onChange={() =>
									setIsSelectable((state) => !state)
								}
							/>
						</label>
						{isSelectable && (
							<button
								onClick={handleDelete}
								className="bg-white text-black rounded p-1"
							>
								Delete Selected
							</button>
						)}
					</div>
				</div>
			</ArtView>
		</>
	);
};

export default ProfilePage;
