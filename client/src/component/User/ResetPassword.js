import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import "./ResetPassword.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
	const dispatch = useDispatch();
	const { token } = useParams();

	const navigate = useNavigate();
	const { error, success, loading } = useSelector(
		(state) => state.forgotPassword
	);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const resetPasswordFormSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();
		myForm.set("password", password);
		myForm.set("confirmPassword", confirmPassword);
		dispatch(resetPassword(token, myForm));
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
		}

		if (error) {
			dispatch(clearErrors());
		}

		if (success) {
			toast.success("Password Updated Successfully");
			navigate("/login");
		}
	}, [error, dispatch, success, navigate]);

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

	const [passwordType2, setPasswordType2] = useState("password");
	const [passwordIcon2, setPasswordIcon2] = useState(<FaEyeSlash />);

	const handleToggle2 = () => {
		if (passwordType2 === "password") {
			setPasswordType2("text");
			setPasswordIcon2(<FaEye />);
		} else {
			setPasswordType2("password");
			setPasswordIcon2(<FaEyeSlash />);
		}
	};

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<div className="reset-password-container">
						<div className="reset-password-box">
							<h2 className="reset-password-heading">
								Reset Password
							</h2>
							<form
								className="reset-password-form"
								onSubmit={resetPasswordFormSubmit}
							>
								<div>
									<LockOpenIcon />
									<input
										type={passwordType}
										placeholder="New Password"
										required
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
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
								<div>
									<LockIcon />
									<input
										type={passwordType2}
										placeholder="Confirm Password"
										required
										value={confirmPassword}
										onChange={(e) =>
											setConfirmPassword(e.target.value)
										}
									/>
									<span
										style={{
											display: confirmPassword
												? "block"
												: "none",
										}}
										className="password-span"
										onClick={handleToggle2}
									>
										{passwordIcon2}
									</span>
								</div>
								<input
									type="submit"
									value="Reset"
									className="reset-password-btn"
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

export default ResetPassword;
