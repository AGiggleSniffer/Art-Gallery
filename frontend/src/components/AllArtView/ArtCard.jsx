import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LikeCounter from "./LikeCounter";
import {
	BsFillHandThumbsDownFill,
	BsFillHandThumbsUpFill,
	BsHandThumbsDown,
	BsHandThumbsUp,
} from "react-icons/bs";
import { useModal } from "../../context/ModalProvider";
import SignupFormModal from "../Modals/SignupFormModal";
import * as artActions from "../../store/art";
import * as sessionActions from "../../store/session";

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
	const sessionUser = useSelector(sessionActions.user);
	const [isLiked, setIsLiked] = useState(null);
	const { setModalContent } = useModal();

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
		if (!sessionUser)
			return setModalContent(
				<SignupFormModal extraMessage="Signup to like or dislike Art" />,
			);
		
		try {
			if (isLiked === null) {
				setIsLiked(true);
				await dispatch(artActions.likeThunk(id));
			} else if (isLiked === true) {
				setIsLiked(null);
				await dispatch(artActions.deleteReivewThunk(id));
			} else if (isLiked === false) {
				setIsLiked(true);
				await dispatch(artActions.updateReivewThunk(id, true, false));
			}
		} catch (err) {
			setIsLiked(isLiked);
			const res = await err.json();
			console.log(res);
		}
	};

	const onDislike = async () => {
		if (!sessionUser)
			return setModalContent(
				<SignupFormModal extraMessage="Signup to like or dislike Art" />,
			);
		
		try {
			if (isLiked === null) {
				setIsLiked(false);
				await dispatch(artActions.dislikeThunk(id));
			} else if (isLiked === false) {
				setIsLiked(null);
				await dispatch(artActions.deleteReivewThunk(id));
			} else if (isLiked === true) {
				setIsLiked(false);
				await dispatch(artActions.updateReivewThunk(id, false, true));
			}
		} catch (err) {
			setIsLiked(isLiked);
			const res = await err.json();
			console.log(res);
		}
	};

	return (
		<div key={id} className="my-4 flex flex-col relative">
			<figure className="string flex flex-col justify-center items-center cursor-pointer overflow-hidden">
				<img
					className="frame w-full bg-[url('/cream-paper.png')] bg-white pixelated"
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
