import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const loginDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo1@aa.io", 'password'));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  }
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <div className="login_form_main">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login_form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="login_input_box">
          <div className="login_input_label">Email</div>
          <div className="login_input">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="login_input_box">
          <div className="login_input_label">Password</div>
          <div className="login_input">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="login_button_box">
          <div onClick={handleSubmit} type="submit">Log In</div>
        </div>
        <div className="demo_login" onClick={loginDemo}>Log In as Demo1</div>
      </form>

    </div>
  );
}

export default LoginFormModal;
