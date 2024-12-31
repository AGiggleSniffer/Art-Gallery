import { BsExclamationCircleFill } from "react-icons/bs";

export default function ErrorDisplay({ msg }) {
	return (
		<p className="flex text-nowrap justify-center items-center text-red-300">
			<BsExclamationCircleFill className="mr-2" />
			{msg}
		</p>
	);
}
