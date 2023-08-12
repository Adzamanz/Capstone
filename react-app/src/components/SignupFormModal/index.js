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
		// e.preventDefault();
		let newErrors = {};
		if(!email.includes("@") || !email.includes(".") || !(email.indexOf(".") > email.indexOf("@")) || !(email.indexOf("@") > 0) || email.length > 255){
			newErrors.email="please enter a valid email."
		}
		if(username.length > 40){
			newErrors.username="please enter a username less than 40 characters"
		}
		if(password.length < 8){
			newErrors.password="your password must be at least 8 characters long"
		}
		if(password !== confirmPassword){
			newErrors.confirmPassword="Confirm Password field must be the same as the Password field"
		}
		setErrors(newErrors)
		if (Object.values(newErrors) == 0) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		}
	};

	return (
		<div className="signup_modal">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className="signup_form">
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
					{errors.email && <div className="error"> {errors.email} </div>}
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
					{errors.username && <div className="error"> {errors.username} </div>}
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
					{errors.password && <div className="error"> {errors.password} </div>}
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
					{errors.confirmPassword && <div className="error"> {errors.confirmPassword} </div>}
				<div className="signup_button_box">
				<div onClick={handleSubmit} type="submit">Sign Up</div>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
