import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as artActions from "../../store/art";
import * as sessionActions from "../../store/session";
import FilterButton from "./FilterButton";
import ArtCard from "./ArtCard";
import { AnimatePresence, motion } from "motion/react";
import Pagination from "./Pagination";
import randInt from "../../utils/randInt.js";

export default function AllArtView() {
	const dispatch = useDispatch();
	const scrollRef = useRef();
	const [filterState, setFilter] = useState("");
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(20);
	const allArts = useSelector(artActions.selectAllArtArr);
	const artCount = useSelector(artActions.artCount);
	const sessionUser = useSelector(sessionActions.user);
	const filters = ["Name", /*"Artist",*/ "Oldest", "Likes", "Dislikes"];

	useEffect(() => {
		dispatch(artActions.loadAllThunk({ filterState, page, size }));
	}, [dispatch, filterState, page, size, sessionUser]);

	useEffect(() => {
		dispatch(sessionActions.updateCtx(null));
	});

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
								setPage(1);
							} else {
								setFilter(filter);
								setPage(1);
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
				className="overflow-scroll overflow-x-hidden px-4 scroll-smooth flex justify-center"
				ref={scrollRef}
			>
				<div className="xl:w-5/6 w-full">
					<Pagination
						className="py-3 my-3 border-b"
						size={size}
						setSize={setSize}
						page={page}
						setPage={setPage}
						count={artCount}
					/>
					<div className="grid gap-4 auto-rows-min md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						<AnimatePresence>
							{allArts.map((art) => (
								<motion.div
									style={{ originY: 0 }}
									initial={{
										y: "10vh",
										rotateZ: randInt(0, 1)
											? randInt(5, 45)
											: -randInt(5, 45),
									}}
									whileInView={{
										y: 0,
										rotateZ: 0,
										transition: {
											type: "spring",
											damping: randInt(3, 10),
											duration: 50,
											y: {
												damping: 100,
											},
										},
									}}
									viewport={{ root: scrollRef, once: false }}
									exit={{
										y: "110vh",
										rotateZ: randInt(0, 1)
											? randInt(15, 65)
											: -randInt(15, 65),
										transition: {
											duration: 0.5,
										},
									}}
									// layout
									key={art.id}
								>
									<ArtCard art={art} />
								</motion.div>
							))}
						</AnimatePresence>
					</div>
					<Pagination
						className="py-3 my-3 border-t"
						size={size}
						setSize={setSize}
						page={page}
						setPage={setPage}
						count={artCount}
						scrollRef={scrollRef}
						bottom
					/>
				</div>
			</div>
		</>
	);
}
