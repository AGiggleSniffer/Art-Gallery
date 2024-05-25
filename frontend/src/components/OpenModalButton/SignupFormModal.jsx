import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./ModalForm.css";

function SignupFormModal({ extraMessage }) {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

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
				.then(closeModal)
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
		<>
			<h1>Sign Up</h1>
			{extraMessage && <h2>{extraMessage}</h2>}
			<form onSubmit={handleSubmit}>
				<div>
					<label style={{ top: email ? 0 : "" }} htmlFor="email">
						Email
					</label>
					<input
						id="email"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				{errors.email && <p>{errors.email}</p>}
				<div>
					<label style={{ top: username ? 0 : "" }} htmlFor="username">
						Username
					</label>
					<input
						id="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				{errors.username && <p>{errors.username}</p>}
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
				{errors.password && <p>{errors.password}</p>}
				<div>
					<label
						style={{ top: confirmPassword ? 0 : "" }}
						htmlFor="confirmpassword"
					>
						Confirm Password
					</label>
					<input
						id="confirmpassword"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				{errors.confirmPassword && <p>{errors.confirmPassword}</p>}
				<button className="classic" type="submit">
					Sign Up
				</button>
			</form>
		</>
	);
}

export default SignupFormModal;
