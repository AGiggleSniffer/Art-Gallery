import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "motion/react";

import FilterButton from "./FilterButton.jsx";
import ArtCard from "./ArtCard.jsx";
import Pagination from "./Pagination.jsx";
import ArtMotionFrame from "./ArtMotionFrame.jsx";

import * as artActions from "../../store/art.js";
import * as sessionActions from "../../store/session.js";

export default function ArtView({
	artArray,
	paginationOptions: { filterState, setFilter, page, setPage, size, setSize },
	setSelection,
	isSelectable = false,
	children,
}) {
	const dispatch = useDispatch();
	const scrollRef = useRef();
	const artCount = useSelector(artActions.artCount);
	const filters = ["Name", "Oldest", "Likes", "Dislikes"];
	const handleSelect = (e) => {
		const id = e.target.value;
		setSelection((state) => {
			const newSet = new Set([...state]);
			if (newSet.has(`${id}`)) {
				newSet.delete(`${id}`);
			} else {
				newSet.add(`${id}`);
			}
			return newSet;
		});
	};

	useEffect(() => {
		dispatch(sessionActions.updateCtx(null));
	}, [dispatch]);

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
					{children}
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
							{artArray?.map((art) => (
								<ArtMotionFrame
									key={art.id}
									scrollRef={scrollRef}
								>
									<ArtCard art={art} />
									{isSelectable && (
										<label className="absolute top-0 left-0 w-full h-full">
											<input
												className="absolute size-6 top-0 left-0"
												type="checkbox"
												value={art.id}
												onChange={(e) =>
													handleSelect(e)
												}
											/>
										</label>
									)}
								</ArtMotionFrame>
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
