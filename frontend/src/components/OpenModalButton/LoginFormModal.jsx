import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import ErrorDisplay from "./ErrorDisplay";

function LoginFormModal() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
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
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	return (
		<>
			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label style={{ top: credential ? 0 : "" }} htmlFor="credential">
						Username or Email
					</label>
					<input
						id="credential"
						type="text"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</div>
				<div>
					<label style={{ top: password ? 0 : "" }} htmlFor="password">
						Password
					</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{errors.credential && <ErrorDisplay msg={errors.credential} />}
				<span>
					<button className="classic" type="submit">
						Log In
					</button>
					<button className="classic" onClick={loginDemo}>
						Demo Login
					</button>
				</span>
			</form>
		</>
	);
}

export default LoginFormModal;
