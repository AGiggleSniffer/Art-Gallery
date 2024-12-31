import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import ErrorDisplay from "./ErrorDisplay";
import SunsetForm from "./SunsetForm";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "./LoginFormModal";
import { useModal } from "../../context/ModalProvider";

function SignupFormModal({ extraMessage }) {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { close } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors({});
			return dispatch(
				sessionActions.signup({
					email,
					username,
					password,
				}),
			)
				.then(close())
				.catch(async (res) => {
					const data = await res.json();
					if (data?.errors) {
						setErrors(data.errors);
					}
				});
		}
		return setErrors({
			confirmPassword:
				"Confirm Password field must be the same as the Password field",
		});
	};

	return (
		<SunsetForm handleSubmit={handleSubmit}>
			<div className="flex flex-col items-center justify-center gap-2 my-8 lg:m-4">
				<img src="Icon.png" className="h-20 w-fit lg:h-12" />
				<h1 className="text-4xl font-bold text-center">Sign Up</h1>
				{extraMessage && <h2 className="text-sm">{extraMessage}</h2>}
			</div>
			<div className="w-full h-full flex flex-col gap-2 md:px-12 lg:px-0 text-xl">
				<div className="flex flex-col w-full">
					<label htmlFor="email">Email</label>
					<input
						className="rounded text-black p-2"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						autoComplete="username"
					/>
				</div>
				{errors.email && <ErrorDisplay msg={errors.email} />}
				<div className="flex flex-col w-full">
					<label htmlFor="username">Username</label>
					<input
						className="rounded text-black p-2"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						autoComplete="username"
					/>
				</div>
				{errors.username && <ErrorDisplay msg={errors.username} />}
				<div className="flex flex-col w-full">
					<label htmlFor="password">Password</label>
					<input
						className="rounded text-black p-2"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						autoComplete="new-password"
					/>
				</div>
				{errors.password && <ErrorDisplay msg={errors.password} />}
				<div className="flex flex-col w-full">
					<label htmlFor="confirmpassword">Confirm Password</label>
					<input
						className="rounded text-black p-2"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						autoComplete="new-password"
					/>
				</div>
				{errors.confirmPassword && (
					<ErrorDisplay msg={errors.confirmPassword} />
				)}
				<div className="w-full">
					<button
						className="purple-gradient w-full mt-6 rounded py-2"
						type="submit"
					>
						Sign Up
					</button>
				</div>
			</div>
			<div className="h-full flex items-end">
				<p className="text-sm text-nowrap">
					Already have an Account?
					<OpenModalButton
						className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400"
						buttonText="Login"
						modalComponent={<LoginFormModal />}
					/>
				</p>
			</div>
		</SunsetForm>
	);
}

export default SignupFormModal;
