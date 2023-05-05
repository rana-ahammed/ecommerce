import React, { Fragment, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Sidebar from "../Admin/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import {
	clearErrors,
	deleteOrder,
	getAllOrders,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrdersList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, orders } = useSelector((state) => state.allOrders);
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.order
	);

	const deleteOrderHandler = (id) => {
		dispatch(deleteOrder(id));
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			toast.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			toast.success("Order Deleted Successfully");
			navigate("/admin/orders");
			dispatch({ type: DELETE_ORDER_RESET });
		}
		dispatch(getAllOrders());
	}, [dispatch, error, deleteError, isDeleted, navigate]);
	const columns = [
		{ field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
		{
			field: "status",
			headerName: "Status",
			minWidth: 150,
			flex: 0.5,
			cellClassName: (params) => {
				return params.row.status === "Delivered"
					? "greenColor"
					: "redColor";
			},
		},
		{
			field: "itemsQty",
			headerName: "Items Qty",
			type: "number",
			minWidth: 150,
			flex: 0.4,
		},
		{
			field: "amount",
			headerName: "Amount",
			type: "number",
			minWidth: 270,
			flex: 0.5,
		},
		{
			field: "actions",
			headerName: "Actions",
			type: "number",
			minWidth: 150,
			flex: 0.3,
			sortable: false,
			renderCell: (params) => {
				return (
					<Fragment>
						<Link to={`/admin/order/${params.row.id}`}>
							<EditIcon />
						</Link>

						<Button
							onClick={() => deleteOrderHandler(params.row.id)}
						>
							<DeleteIcon />
						</Button>
					</Fragment>
				);
			},
		},
	];

	const rows = [];

	orders &&
		orders.forEach((item) => {
			rows.push({
				id: item._id,
				itemsQty: item.orderItems.length,
				amount: item.totalPrice,
				status: item.orderStatus,
			});
		});
	return (
		<Fragment>
			<MetaData title={"All ORDERS --- Admin"} />
			<div className="dashboard">
				<Sidebar />
				<div className="product-list-container">
					<h1 className="product-list-heading">ALL ORDERS</h1>
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

export default OrdersList;
