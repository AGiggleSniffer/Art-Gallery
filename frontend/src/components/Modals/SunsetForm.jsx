import { BsArrowLeft } from "react-icons/bs";
import { useModal } from "../../context/ModalProvider";

const SunsetForm = ({ children, handleSubmit }) => {
	const { close } = useModal();
	return (
		<div
			key="loginForm"
			className="lg:grid lg:rounded-lg overflow-hidden grid-cols-3 grid-rows-1"
		>
			<div className="lg:block hidden col-span-full row-start-1">
				<img src="/sunset.jpg" className="object-none h-full w-full"></img>
			</div>
			<form
				onSubmit={handleSubmit}
				className="lg:rounded-md flex flex-col gap-2 items-center bg-neutral-700 p-6 shadow-lg col-start-3 row-start-1 lg:scale-90 lg:-translate-x-4 h-svh w-svw lg:h-full lg:w-full"
			>
				<div className="md:text-4xl text-2xl absolute top-6 left-6 lg:hidden">
					<BsArrowLeft className="cursor-pointer" onClick={close} />
				</div>
				{children}
			</form>
		</div>
	);
};

export default SunsetForm;
