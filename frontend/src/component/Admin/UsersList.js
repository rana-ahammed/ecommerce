import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { clearErrors, deleteUser, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, users } = useSelector((state) => state.allUsers);
	const {
		error: deleteError,
		isDeleted,
		message,
	} = useSelector((state) => state.userDelete);

	const deleteUserHandler = (id) => {
		dispatch(deleteUser(id));
	};

	useEffect(() => {
		if (error) {
			toast.error(error, {
				toastId: "error1",
			});
			dispatch(clearErrors());
		}
		if (deleteError) {
			toast.error(deleteError, {
				toastId: "error1",
			});
			dispatch(clearErrors());
		}
		if (isDeleted) {
			toast.success(message, {
				toastId: "success1",
			});
			navigate("/admin/users");
			dispatch({ type: DELETE_USER_RESET });
		}
		dispatch(getAllUsers());
	}, [error, dispatch, deleteError, isDeleted, message, navigate]);
	const columns = [
		{ field: "id", headerName: "User Id", minWidth: 200, flex: 1 },
		{ field: "email", headerName: "Email", minWidth: 300, flex: 0.5 },
		{ field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
		{
			field: "role",
			headerName: "Role",
			minWidth: 100,
			flex: 0.5,
			cellClassName: (params) =>
				params.row.role === "admin" ? "greenColor" : "redColor",
		},
		{
			field: "actions",
			headerName: "Actions",
			minWidth: 150,
			sortable: false,
			renderCell: (params) => {
				return (
					<Fragment>
						<Link to={`/admin/user/${params.row.id}`}>
							<EditIcon />
						</Link>
						<Button
							onClick={() => deleteUserHandler(params.row.id)}
						>
							<DeleteIcon />
						</Button>
					</Fragment>
				);
			},
		},
	];

	const rows = [];

	users &&
		users.forEach((item) => {
			rows.push({
				id: item._id,
				role: item.role,
				email: item.email,
				name: item.name,
			});
		});

	return (
		<Fragment>
			<MetaData title={`ALL USERS -- Admin`} />
			<div className="dashboard">
				<Sidebar />
				<div className="product-list-container">
					<h1 id="product-list-heading">ALL USERS</h1>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						className="product-list-table"
						autoHeight
						rowsPerPageOptions={[10]}
					/>
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

export default UsersList;
