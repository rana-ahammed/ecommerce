import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./UpdatePassword.css";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const UpdatePassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, isUpdated, loading } = useSelector((state) => state.profile);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const updatePasswordSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("oldPassword", oldPassword);
		myForm.set("newPassword", newPassword);
		myForm.set("confirmPassword", confirmPassword);
		dispatch(updatePassword(myForm));
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			toast.success("Password Updated Successfully");
			navigate("/account");
			dispatch({ type: UPDATE_PASSWORD_RESET });
		}
	}, [error, dispatch, isUpdated, navigate]);

	const [passwordType, setPasswordType] = useState("password");

	const handleToggle = () => {
		if (passwordType === "password") {
			setPasswordType("text");
		} else {
			setPasswordType("password");
		}
	};
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="Change Password" />
					<div className="update-password-container">
						<div className="update-password-box">
							<div className="update-password-heading">
								Change Password
							</div>
							<form
								className="update-password-form"
								onSubmit={updatePasswordSubmit}
							>
								<div className="old-password">
									<VpnKeyIcon />
									<input
										type={passwordType}
										placeholder="Old Password"
										required
										value={oldPassword}
										onChange={(e) =>
											setOldPassword(e.target.value)
										}
									/>
								</div>

								<div className="new-password">
									<LockOpenIcon />
									<input
										type={passwordType}
										placeholder="New Password"
										required
										value={newPassword}
										onChange={(e) =>
											setNewPassword(e.target.value)
										}
									/>
								</div>

								<div className="confirm-password">
									<LockIcon />
									<input
										type={passwordType}
										placeholder="Confirm Password"
										required
										value={confirmPassword}
										onChange={(e) =>
											setConfirmPassword(e.target.value)
										}
									/>
								</div>
								<div>
									<input
										type="checkbox"
										id="show-password"
										onClick={handleToggle}
									/>
									<label htmlFor="show-password">
										Show Password
									</label>
								</div>
								<input
									type="submit"
									value="Change"
									className="update-password-btn"
								/>
							</form>
						</div>
					</div>
				</Fragment>
			)}
			<ToastContainer
				position="top-center"
				hideProgressBar={true}
				theme="dark"
			/>
		</Fragment>
	);
};

export default UpdatePassword;
