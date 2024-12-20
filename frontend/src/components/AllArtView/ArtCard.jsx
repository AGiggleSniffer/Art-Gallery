import { useNavigate } from "react-router-dom";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";

const ArtCard = ({
	art: { id, data_url, name, dislikeCount, likeCount, createdAt, User },
}) => {
	const navigate = useNavigate();
	return (
		<div key={id} className="h-fit w-full my-4 flex flex-col">
			<figure className="flex justify-center items-center ">
				<img
					className="h-full bg-white rounded"
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
					<p className="flex rounded-full bg-black/20 px-3 py-1">
						<button className="flex items-center mr-2">
							<BsHandThumbsUp />
							{likeCount}
						</button>
						<button className="flex items-center">
							<BsHandThumbsDown />
							{dislikeCount}
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ArtCard;
