import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../../actions/userAction";
import "./UpdateProfile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors } from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import FaceIcon from "@mui/icons-material/Face";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";

const UpdateProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.user);
	const { error, isUpdated, loading } = useSelector((state) => state.profile);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

	const updateProfileSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();
		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("avatar", avatar);
		dispatch(updateProfile(myForm));
	};

	const updateProfileDataChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			}
		};

		reader.readAsDataURL(e.target.files[0]);
	};

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setAvatarPreview(user.avatar.url);
		}
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			toast.success("Profile Updated Successfully");
			dispatch(loadUser());
			navigate("/account");
			dispatch({
				type: UPDATE_PROFILE_RESET,
			});
		}
	}, [error, dispatch, isUpdated, navigate, user]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="Update Profile" />
					<div className="update-profile-container">
						<div className="update-profile-box">
							<h2 className="update-profile-heading">
								Update Profile
							</h2>
							<form
								className="update-profile-form"
								encType="multipart/form-data"
								onSubmit={updateProfileSubmit}
							>
								<div className="update-profile-name">
									<FaceIcon />
									<input
										type="text"
										placeholder="Name"
										required
										name="name"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</div>

								<div className="update-profile-email">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Email"
										required
										name={email}
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>

								<div id="update-profile-image">
									<img
										src={avatarPreview}
										alt="Avatar Preview"
									/>
									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={updateProfileDataChange}
									/>
								</div>

								<input
									type="submit"
									value="Update"
									className="update-profile-btn"
								/>
							</form>
						</div>
					</div>
				</Fragment>
			)}
			<ToastContainer
				position="bottom-center"
				theme="dark"
				hideProgressBar={true}
			/>
		</Fragment>
	);
};

export default UpdateProfile;
