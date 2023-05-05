import MailOutline from "@mui/icons-material/MailOutline";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./ForgotPassword.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors } from "../../actions/productAction";

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const { loading, error, message } = useSelector(
		(state) => state.forgotPassword
	);

	const [email, setEmail] = useState("");

	const forgotPasswordSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("email", email);
		dispatch(forgotPassword(myForm));
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (message) {
			return toast.success(message);
		}
	}, [error, dispatch, message]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="Forgot Password" />
					<div className="forgot-password-container">
						<div className="forgot-password-box">
							<h2 className="forgot-password-heading">
								Forgot Password
							</h2>
							<form
								className="forgot-password-form"
								onSubmit={forgotPasswordSubmit}
							>
								<div className="forgot-password-email">
									<MailOutline />
									<input
										type="email"
										placeholder="Email"
										required
										name="email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
								<input
									type="submit"
									value="Send"
									className="forgot-password-btn"
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

export default ForgotPassword;
