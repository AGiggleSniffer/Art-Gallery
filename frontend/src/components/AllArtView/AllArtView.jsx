import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as artActions from "../../store/art";
import * as sessionActions from "../../store/session";
import FilterButton from "./FilterButton";
import ArtCard from "./ArtCard";
import { AnimatePresence, motion } from "motion/react";
import Pagination from "./Pagination";

export default function AllArtView() {
	const dispatch = useDispatch();
	const scrollRef = useRef();
	const [filterState, setFilter] = useState("");
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(20);
	const allArts = useSelector(artActions.allArtArr);
	const artCount = useSelector(artActions.artCount);

	useEffect(() => {
		dispatch(artActions.loadAllThunk({ filterState, page, size }));
	}, [dispatch, filterState, page, size]);

	useEffect(() => {
		dispatch(dispatch(sessionActions.updateCtx(null)));
	});

	const filters = ["Art Name", "Artist", "Date", "Likes", "Dislikes"];

	return (
		<>
			<section
				id="nav-filter"
				className="h-10 bg-neutral-600/50 flex-shrink-0 flex items-center overflow-y-hidden px-3 overflow-x-scoll select-none border-t border-neutral-600/50"
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
			<div
				className="overflow-scroll overflow-x-hidden px-4 scroll-smooth"
				ref={scrollRef}
			>
				<Pagination
					className="my-6"
					size={size}
					setSize={setSize}
					page={page}
					setPage={setPage}
					count={artCount}
				/>
				<div className="grid auto-rows-min md:grid-cols-2 gap-4 xl:grid-cols-4">
					<AnimatePresence>
						{allArts.map((art) => (
							<motion.div
								initial={{ opacity: 0, scale: 0.75 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ root: scrollRef, once: true }}
								exit={{ scale: 0.5 }}
								layout
								key={art.id}
							>
								<ArtCard art={art} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>
				<Pagination
					className="my-6"
					size={size}
					setSize={setSize}
					page={page}
					setPage={setPage}
					count={artCount}
					scrollRef={scrollRef}
					bottom
				/>
			</div>
		</>
	);
}
