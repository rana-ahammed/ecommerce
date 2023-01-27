import React from "react";
import "./OrderSuccess.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
	return (
		<div className="order-success">
			<CheckCircleIcon />
			<Typography>Your Order has been placed successfully.</Typography>
			<Link to="/orders">View Orders</Link>
		</div>
	);
};

export default OrderSuccess;
