import { useNavigate } from "react-router-dom";
import LikeCounter from "./LikeCounter";
import {
	BsFillHandThumbsDownFill,
	BsFillHandThumbsUpFill,
	BsHandThumbsDown,
	BsHandThumbsUp,
} from "react-icons/bs";
import { useState } from "react";

const ArtCard = ({
	art: { id, data_url, name, dislikeCount, likeCount, createdAt, User },
}) => {
	const navigate = useNavigate();
	const [isLiked, setIsLiked] = useState();
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
							onClick={() =>
								setIsLiked((state) => (state ? null : true))
							}
							className="pl-2 pr-1 py-1 flex items-center justify-center relative"
							icon={<BsHandThumbsUp className="mr-1" />}
							icon2={<BsFillHandThumbsUpFill className="mr-1" />}
							count={likeCount}
							active={isLiked}
						/>
						<LikeCounter
							onClick={() =>
								setIsLiked((state) =>
									state === false ? null : false,
								)
							}
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
