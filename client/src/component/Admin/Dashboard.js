import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors, getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";

const Dashboard = () => {
	const dispatch = useDispatch();
	const { error, products } = useSelector((state) => state.products);
	const { orders } = useSelector((state) => state.allOrders);
	const { users } = useSelector((state) => state.allUsers);

	let outOfStock = 0;

	products &&
		products.forEach((item) => {
			if (item.Stock === 0) {
				outOfStock += 1;
			}
		});

	let totalAmount = 0;

	orders &&
		orders.forEach((item) => {
			totalAmount += item.totalPrice;
		});

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		dispatch(getAdminProduct());
		dispatch(getAllOrders());
		dispatch(getAllUsers());
	}, [dispatch, error]);
	const lineState = {
		labels: ["Initial Amount", "Amount Earned"],
		datasets: [
			{
				label: "Total Amount",
				backgroundColor: ["tomato"],
				hoverBackgroundColor: ["rgb(197, 72, 49)"],
				data: [0, totalAmount],
			},
		],
	};

	const doughnutState = {
		labels: ["Out of Stock", "InStock"],
		datasets: [
			{
				backgroundColor: ["#00A6B4", "#6800B4"],
				hoverBackgroundColor: ["#4B5000", "35014F"],
				data: [outOfStock, products.length - outOfStock],
			},
		],
	};
	return (
		<div className="dashboard">
			<Sidebar />
			<div className="dashboard-container">
				<Typography component="h1">Dashboard</Typography>
				<div className="dashboard-summary">
					<div>
						<p>
							Total Amount <br /> ৳{totalAmount}
						</p>
					</div>
					<div className="dashboard-summary-box2">
						<Link to="/admin/products">
							<p>Products</p>
							<p>{products && products.length}</p>
						</Link>
						<Link to="/admin/orders">
							<p>Orders</p>
							<p>{orders && orders.length}</p>
						</Link>
						<Link to="/admin/users">
							<p>Users</p>
							<p>{users && users.length}</p>
						</Link>
					</div>
				</div>

				<div className="line-chart">
					<Line data={lineState} />
				</div>

				<div className="doughnut-chart">
					<Doughnut data={doughnutState} />
				</div>
			</div>
			<ToastContainer
				position="bottom-center"
				hideProgressBar={true}
				theme="dark"
			/>
		</div>
	);
};

export default Dashboard;
