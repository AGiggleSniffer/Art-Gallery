import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as artActions from "../../store/art";
import * as sessionActions from "../../store/session";
import FilterButton from "./FilterButton";
import ArtCard from "./ArtCard";

export default function AllArtView() {
	const dispatch = useDispatch();
	const [filterState, setFilter] = useState("");
	const [page, setPage] = useState("");
	const [size, setSize] = useState("");
	const allArts = useSelector(artActions.allArtArr);
	useEffect(() => {
		dispatch(artActions.loadAllThunk({ filterState, page, size }));
		dispatch(dispatch(sessionActions.updateCtx(null)));
	}, [dispatch, filterState, page, size]);

	const filters = ["Art Name", "Artist", "Date", "Likes", "Dislikes"];

	return (
		<>
			<section
				id="nav-filter"
				className="h-10 bg-neutral-600/50 flex-shrink-0 flex items-center overflow-y-hidden px-3 overflow-x-scoll select-none"
			>
				{filters.map((filter) => (
					<FilterButton
						onClick={() => {
							if (filterState === filter) {
								setFilter("");
							} else {
								setFilter(filter);
							}
						}}
						isActive={filterState === filter}
						key={filter}
					>
						{filter}
					</FilterButton>
				))}
			</section>
			<div className="overflow-scroll overflow-x-hidden">
				<div className="grid auto-rows-min md:grid-cols-2 gap-4 mx-4">
					{allArts.map((art) => (
						<ArtCard key={art.id} art={art} />
					))}
				</div>
			</div>
		</>
	);
}
