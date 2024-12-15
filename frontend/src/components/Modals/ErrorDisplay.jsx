import { BsExclamationCircleFill } from "react-icons/bs";

export default function ErrorDisplay({ msg }) {
	return (
		<p>
			<BsExclamationCircleFill />
			{msg}
		</p>
	);
}
