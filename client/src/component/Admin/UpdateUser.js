import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import "./NewProduct.css";
import Sidebar from "./Sidebar";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
	clearErrors,
	getUserDetails,
	updateUser,
} from "../../actions/userAction";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Loader from "../layout/Loader/Loader";

const UpdateUser = () => {
	const dispatch = useDispatch();
	const { loading, error, user } = useSelector((state) => state.userDetails);
	const {
		loading: updateLoading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.userUpdate);
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");

	const { id } = useParams();

	useEffect(() => {
		if (user && user._id !== id) {
			dispatch(getUserDetails(id));
		} else {
			setName(user.name);
			setEmail(user.email);
			setRole(user.role);
		}

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (updateError) {
			toast.error(updateError, {
				toastId: "success1",
			});
			dispatch(clearErrors());
		}
		if (isUpdated) {
			toast.success("User Updated Successfully", {
				toastId: "success1",
			});
			navigate("/admin/users");
			dispatch({ type: UPDATE_USER_RESET });
		}
	}, [error, dispatch, navigate, isUpdated, updateError, id, user]);

	const updateUserSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("role", role);

		dispatch(updateUser(id, myForm));
	};

	return (
		<Fragment>
			<MetaData title="Update User" />
			<div className="dashboard">
				<Sidebar />
				<div className="new-product-container">
					{loading ? (
						<Loader />
					) : (
						<form
							className="create-product-form"
							encType="multipart/form-data"
							onSubmit={updateUserSubmitHandler}
						>
							<h1>Update User</h1>

							<div>
								<PersonIcon />
								<input
									type="text"
									placeholder="Name"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div>
								<MailOutlineIcon />
								<input
									type="email"
									placeholder="Email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div>
								<VerifiedUserIcon />
								<select
									value={role}
									onChange={(e) => setRole(e.target.value)}
								>
									<option value="">Choose Role</option>
									<option value="admin">Admin</option>
									<option value="user">User</option>
								</select>
							</div>

							<Button
								id="create-product-btn"
								type="submit"
								disabled={
									updateLoading
										? true
										: false || role === ""
										? true
										: false
								}
							>
								Update
							</Button>
						</form>
					)}
				</div>
			</div>
			<ToastContainer
				position="bottom-center"
				hideProgressBar={true}
				theme="dark"
			/>
		</Fragment>
	);
};

export default UpdateUser;
