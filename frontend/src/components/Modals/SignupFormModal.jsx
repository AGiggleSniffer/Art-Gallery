import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import ErrorDisplay from "./ErrorDisplay";
// import OpenModalButton from "../OpenModalButton/OpenModalButton";

function SignupFormModal({ extraMessage }) {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});

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
				.then()
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
			<div className="bg-neutral-700 p-12 text-black">
				<h1>Sign Up</h1>
				{extraMessage && <h2>{extraMessage}</h2>}
				<form onSubmit={handleSubmit}>
					<div>
						<label
							style={{ top: email ? 0 : "" }}
							htmlFor="email"
							className={
								"absolute text-black/50 select-none pl-2"
							}
						>
							Email
						</label>
						<input
							id="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							autoComplete="username"
						/>
					</div>
					{errors.email && <ErrorDisplay msg={errors.email} />}
					<div>
						<label
							style={{ top: username ? 0 : "" }}
							htmlFor="username"
							className={
								"absolute text-black/50 select-none pl-2"
							}
						>
							Username
						</label>
						<input
							id="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							autoComplete="username"
						/>
					</div>
					{errors.username && <ErrorDisplay msg={errors.username} />}
					<div>
						<label
							style={{ top: password ? 0 : "" }}
							className={
								"absolute text-black/50 select-none pl-2"
							}
							htmlFor="password"
						>
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							autoComplete="new-password"
						/>
					</div>
					{errors.password && <ErrorDisplay msg={errors.password} />}
					<div className="relative">
						<label
							htmlFor="confirmpassword"
							className={
								"absolute text-black/50 select-none pl-2"
							}
						>
							Confirm Password
						</label>
						<input
							id="confirmpassword"
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
					<span>
						<button className="classic" type="submit">
							Sign Up
						</button>
					</span>
					<span>
						{/* <OpenModalButton buttonText="Or Login" /> */}
					</span>
				</form>
			</div>
	);
}

export default SignupFormModal;
