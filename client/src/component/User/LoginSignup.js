import React, { Fragment, useEffect, useRef, useState } from "react";
import "./LoginSignup.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link, useNavigate } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { login, register, clearErrors } from "../../actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layout/Loader/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginSignup = () => {
	const dispatch = useDispatch();
	const { error, loading, isAuthenticated } = useSelector(
		(state) => state.user
	);
	const navigate = useNavigate();

	const loginTab = useRef();
	const registerTab = useRef();
	const switcherTab = useRef();

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = user;

	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

	const registerDataChange = (e) => {
		if (e.target.name === "avatar") {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors(error));
		}

		if (isAuthenticated) {
			navigate("/account");
		}
	}, [error, isAuthenticated, navigate, dispatch]);

	const switchTabs = (e, tab) => {
		if (tab === "login") {
			switcherTab.current.classList.add("shiftToNeutral");
			switcherTab.current.classList.remove("shiftToRight");

			registerTab.current.classList.remove("shiftToNeutralForm");
			loginTab.current.classList.remove("shiftToLeft");
		}
		if (tab === "register") {
			switcherTab.current.classList.add("shiftToRight");
			switcherTab.current.classList.remove("shiftToNeutral");

			registerTab.current.classList.add("shiftToNeutralForm");
			loginTab.current.classList.add("shiftToLeft");
		}
	};

	const loginSubmit = (e) => {
		e.preventDefault();
		dispatch(login(loginEmail, loginPassword));
	};

	const registerSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();
		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("password", password);
		myForm.set("avatar", avatar);
		dispatch(register(myForm));
	};

	const [passwordType, setPasswordType] = useState("password");
	const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash />);

	const handleToggle = () => {
		if (passwordType === "password") {
			setPasswordType("text");
			setPasswordIcon(<FaEye />);
		} else {
			setPasswordType("password");
			setPasswordIcon(<FaEyeSlash />);
		}
	};
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<div className="login-signup-container">
						<div className="login-signup-box">
							<div>
								<div className="login-signup-toggle">
									<p onClick={(e) => switchTabs(e, "login")}>
										LOGIN
									</p>
									<p
										onClick={(e) =>
											switchTabs(e, "register")
										}
									>
										REGISTER
									</p>
								</div>
								<button ref={switcherTab}></button>
							</div>

							<form
								className="login-form"
								ref={loginTab}
								onSubmit={loginSubmit}
							>
								<div className="login-email">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Email"
										required
										value={loginEmail}
										onChange={(e) =>
											setLoginEmail(e.target.value)
										}
									/>
								</div>
								<div className="login-password">
									<LockOpenIcon />
									<input
										type={passwordType}
										placeholder="Password"
										required
										value={loginPassword}
										onChange={(e) =>
											setLoginPassword(e.target.value)
										}
									/>
									<span
										style={{
											display: loginPassword
												? "block"
												: "none",
										}}
										className="password-span"
										onClick={handleToggle}
									>
										{passwordIcon}
									</span>
								</div>
								<Link to="/password/forgot">
									Forgot Password ?
								</Link>
								<input
									type="submit"
									value="Login"
									className="login-btn"
								/>
							</form>
							<form
								className="signup-form"
								ref={registerTab}
								encType="multipart/form-data"
								onSubmit={registerSubmit}
							>
								<div className="signup-name">
									<FaceIcon />
									<input
										type="text"
										placeholder="Name"
										required
										name="name"
										value={name}
										onChange={registerDataChange}
									/>
								</div>
								<div className="signup-email">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Email"
										required
										name="email"
										value={email}
										onChange={registerDataChange}
									/>
								</div>
								<div className="signup-password">
									<LockOpenIcon />
									<input
										type={passwordType}
										placeholder="Password"
										required
										name="password"
										value={password}
										onChange={registerDataChange}
									/>
									<span
										style={{
											display: password
												? "block"
												: "none",
										}}
										className="password-span"
										onClick={handleToggle}
									>
										{passwordIcon}
									</span>
								</div>
								<div id="register-image">
									<img
										src={avatarPreview}
										alt="Avatar Preview"
									/>
									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={registerDataChange}
									/>
								</div>
								<input
									type="submit"
									value="Register"
									className="signup-btn"
								/>
							</form>
						</div>
					</div>
				</Fragment>
			)}
			<ToastContainer
				position="bottom-center"
				hideProgressBar={true}
				theme="dark"
			/>
		</Fragment>
	);
};

export default LoginSignup;
