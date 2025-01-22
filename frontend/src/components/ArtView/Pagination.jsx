import { useEffect, useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CustomSelect from "./CustomSelect";

const Pagination = ({
	scrollRef,
	size,
	setSize,
	page,
	setPage,
	count,
	bottom,
	...props
}) => {
	const selectRef = useRef(null);
	const options = [20, 35, 50, 65, 80, 100];
	const prevDisabled = page === 1;
	const nextDisabled = page * size >= count;

	useEffect(() => {
		if (!selectRef.current) return;
		selectRef.current.value = size;
	}, [size]);

	return (
		<section {...props}>
			<div className="flex items-center justify-between text-sm text-nowrap">
				<span className="flex items-center">
					<label className="flex items-center">
						Items per page:
						<CustomSelect
							className="text-black bg-white mx-4 rounded z-10"
							options={options}
							selected={size}
							setSelected={setSize}
							scrollRef={scrollRef}
							bottom={bottom}
						/>
					</label>
					<button
						onClick={() => {
							scrollRef?.current?.scrollTo(0, 0);
							setPage((state) => state - 1);
						}}
						disabled={prevDisabled}
						style={prevDisabled ? { opacity: 0.2 } : {}}
						className="mx-2 sm:mx-4 text-base"
					>
						<BsChevronLeft />
					</button>
					<button
						onClick={() => {
							scrollRef?.current?.scrollTo(0, 0);
							setPage((state) => state + 1);
						}}
						disabled={nextDisabled}
						style={nextDisabled ? { opacity: 0.2 } : {}}
						className="mx-2 sm:mx-4 text-base"
					>
						<BsChevronRight />
					</button>
				</span>
				<span className="text-nowrap text-xs sm:text-sm">
					{size * page - size + 1} - {size * page} of {count}
				</span>
			</div>
			{bottom && (
				<div className="flex justify-center text-xs hover:text-underline">
					<div className="rounded hover:bg-white hover:text-black transition-colors duration-300">
						<button
							className="w-full h-full p-2"
							onClick={() => scrollRef?.current?.scrollTo(0, 0)}
						>
							Scroll to Top
						</button>
					</div>
				</div>
			)}
		</section>
	);
};

export default Pagination;
