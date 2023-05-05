import React, { Fragment, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors } from "../../actions/productAction";
import { myOrders } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import "./MyOrders.css";

const MyOrders = () => {
	const dispatch = useDispatch();
	const { loading, error, orders } = useSelector((state) => state.myOrders);
	const { user } = useSelector((state) => state.user);

	const columns = [
		{ field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
		{
			field: "status",
			headerName: "Status",
			minWidth: 150,
			flex: 0.5,
			cellClassName: (params) => {
				return params.getValue(params.id, "status") === "Delivered"
					? "greenColor"
					: "redColor";
			},
		},
		{
			field: "itemsQty",
			headerName: "Items Qty",
			type: "number",
			minWidth: 150,
			flex: 0.3,
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
					<Link to={`/order/${params.getValue(params.id, "id")}`}>
						<LaunchIcon />
					</Link>
				);
			},
		},
	];
	const rows = [];

	orders &&
		orders.forEach((item, index) => {
			rows.push({
				itemsQty: item.orderItems.length,
				id: item._id,
				status: item.orderStatus,
				amount: item.totalPrice,
			});
		});

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		dispatch(myOrders());
	}, [error, dispatch]);
	return (
		<Fragment>
			<MetaData title={`${user.name} - Orders`} />
			{loading ? (
				<Loader />
			) : (
				<div className="my-orders-page">
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						className="my-orders-table"
						autoHeight
					/>
					<Typography id="my-orders-heading">
						{user.name}'s Order
					</Typography>
				</div>
			)}
			<ToastContainer
				position="bottom-center"
				hideProgressBar={true}
				theme="dark"
			/>
		</Fragment>
	);
};

export default MyOrders;
