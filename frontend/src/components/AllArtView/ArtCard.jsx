import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LikeCounter from "./LikeCounter";
import {
	BsFillHandThumbsDownFill,
	BsFillHandThumbsUpFill,
	BsHandThumbsDown,
	BsHandThumbsUp,
} from "react-icons/bs";
import * as artActions from "../../store/art";

const ArtCard = ({
	art: {
		id,
		data_url,
		name,
		likeCount,
		dislikeCount,
		createdAt,
		User,
		Reviews,
	},
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLiked, setIsLiked] = useState(null);

	useEffect(() => {
		if (!Reviews) return;

		if (Reviews[0]?.liked) {
			setIsLiked(true);
		}

		if (Reviews[0]?.disliked) {
			setIsLiked(false);
		}
	}, [Reviews]);

	const onLike = async () => {
		try {
			if (isLiked === null) {
				await dispatch(artActions.likeThunk(id));
				setIsLiked(true);
			} else if (isLiked === true) {
				await dispatch(artActions.deleteReivewThunk(id));
				setIsLiked(null);
			} else if (isLiked === false) {
				await dispatch(artActions.deleteReivewThunk(id));
				await dispatch(artActions.likeThunk(id));
				setIsLiked(true);
			}
		} catch (err) {
			const res = await err.json();
			console.log(res);
		}
	};

	const onDislike = async () => {
		try {
			if (isLiked === null) {
				await dispatch(artActions.dislikeThunk(id));
				setIsLiked(false);
			} else if (isLiked === false) {
				await dispatch(artActions.deleteReivewThunk(id));
				setIsLiked(null);
			} else if (isLiked === true) {
				await dispatch(artActions.deleteReivewThunk(id));
				await dispatch(artActions.dislikeThunk(id));
				setIsLiked(false);
			}
		} catch (err) {
			const res = await err.json();
			console.log(res);
		}
	};

	return (
		<div key={id} className="my-4 flex flex-col">
			<figure className="flex justify-center items-center cursor-pointer bg-black rounded overflow-hidden">
				<img
					className="w-full bg-[url('/cream-paper.png')] bg-white pixelated"
					src={data_url}
					onClick={() => navigate(`/arts/${id}`)}
				/>
			</figure>
			<div className="my-4">
				<h1 className="text-xl">{name}</h1>
				<div className="flex justify-between">
					<p className="text-neutral-400 flex items-center">
						{User.username} - {new Date(createdAt).toDateString()}
					</p>
					<span className="flex rounded-full bg-black/20">
						<LikeCounter
							onClick={onLike}
							className="pl-2 pr-1 py-1 flex items-center justify-center relative"
							icon={<BsHandThumbsUp className="mr-1" />}
							icon2={<BsFillHandThumbsUpFill className="mr-1" />}
							count={likeCount}
							active={isLiked}
						/>
						<LikeCounter
							onClick={onDislike}
							className="pr-2 pl-1 py-1 flex items-center justify-center relative"
							icon={<BsHandThumbsDown className="mr-1" />}
							icon2={
								<BsFillHandThumbsDownFill className="mr-1" />
							}
							count={dislikeCount}
							active={isLiked === false}
						/>
					</span>
				</div>
			</div>
		</div>
	);
};

export default ArtCard;
