import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup_modal">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className="signup_form">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="signup_input_box">
					<div className="signup_input_label">Email</div>
					<div className="signup_input">
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="signup_input_box">
					<div className="signup_input_label">Username</div>
					<div className="signup_input">
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="signup_input_box">
					<div className="signup_input_label">Password</div>
					<div className="signup_input">
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="signup_input_box">
					<div className="signup_input_label">Confirm Password</div>
					<div className="signup_input">
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="signup_button_box">
					<button type="submit">Sign Up</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
