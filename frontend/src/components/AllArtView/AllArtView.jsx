import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as artActions from "../../store/art";
import * as sessionActions from "../../store/session";
import FilterButton from "./FilterButton";
import ArtCard from "./ArtCard";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

export default function AllArtView() {
	const dispatch = useDispatch();
	const scrollRef = useRef();
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
			<div className="overflow-scroll overflow-x-hidden" ref={scrollRef}>
				<MotionConfig
					viewport={{ root: scrollRef, amount: "some", once: true }}
				>
					<AnimatePresence>
						<motion.div className="grid auto-rows-min md:grid-cols-2 gap-4 mx-4">
							{allArts.map((art) => (
								<motion.div
									initial={{ opacity: 0, scale: 0.5 }}
									whileInView={{ opacity: 1, scale: 1 }}
									exit={{ scale: 0.5 }}
									layout
									key={art.id}
								>
									<ArtCard art={art} />
								</motion.div>
							))}
						</motion.div>
					</AnimatePresence>
				</MotionConfig>
			</div>
		</>
	);
}
