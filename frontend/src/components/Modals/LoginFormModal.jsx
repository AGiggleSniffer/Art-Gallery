import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import ErrorDisplay from "./ErrorDisplay";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "./SignupFormModal";
import SunsetForm from "./SunsetForm";
import { useModal } from "../../context/ModalProvider";

function LoginFormModal() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { close } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(sessionActions.login({ credential, password }))
			.then(close())
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	const loginDemo = () => {
		return dispatch(
			sessionActions.login({
				credential: "demo@user.io",
				password: "password",
			}),
		)
			.then(close())
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	return (
		<SunsetForm handleSubmit={handleSubmit}>
			<div className="flex flex-col items-center justify-center gap-2 my-8 lg:m-4">
				<img src="/Icon.png" className="h-20 w-fit lg:h-12" />
				<h1 className="text-4xl font-bold text-center">Log In</h1>
				<h2 className="text-sm">Draw and Share Art</h2>
			</div>
			<div className="w-full h-full flex flex-col gap-2 md:px-12 lg:px-0 lg:my-9 text-xl">
				<div className="flex flex-col w-full">
					<label htmlFor="credential">Username or Email</label>
					<input
						className="rounded text-black p-2"
						type="text"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</div>
				<div className="flex flex-col w-full">
					<label htmlFor="password">Password</label>
					<input
						className="rounded text-black p-2"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{errors.credential && <ErrorDisplay msg={errors.credential} />}
				<div className="flex flex-col gap-2 w-full my-4">
					<button
						className="w-full rounded purple-gradient py-2"
						type="submit"
					>
						Log In
					</button>
					<button
						className="w-full rounded bg-neutral-500 py-2"
						onClick={loginDemo}
					>
						Demo Login
					</button>
				</div>
			</div>
			<div className="flex items-end">
				<p className="text-sm text-nowrap">
					Not a member?
					<OpenModalButton
						className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400"
						buttonText="Create an Account"
						modalComponent={<SignupFormModal />}
					/>
				</p>
			</div>
		</SunsetForm>
	);
}

export default LoginFormModal;
