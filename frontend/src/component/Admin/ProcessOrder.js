import { Button, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	clearErrors,
	getOrderDetails,
	updateOrder,
} from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./ProcessOrder.css";

const ProcessOrder = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { loading, error, order } = useSelector(
		(state) => state.orderDetails
	);
	const { error: updateError, isUpdated } = useSelector(
		(state) => state.order
	);

	const [status, setStatus] = useState("");

	const updateOrderSubmitHandler = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.set("status", status);
		dispatch(updateOrder(id, myForm));
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			toast.error(updateError);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			toast.success("Order Updated Successfully");
			dispatch({ type: UPDATE_ORDER_RESET });
		}
		dispatch(getOrderDetails(id));
	}, [error, dispatch, id, updateError, isUpdated]);

	return (
		<Fragment>
			<MetaData title="Process Order" />
			<div className="dashboard">
				<Sidebar />
				<div className="new-product-container">
					{loading ? (
						<Loader />
					) : (
						<div className="confirm-order-page">
							<div>
								<Typography>Shipping Info</Typography>
								<div className="order-details-container-box">
									<div>
										<p>Name:</p>
										<span>
											{order.user && order.user.name}
										</span>
									</div>
									<div>
										<p>Phone:</p>
										<span>
											{order.shippingInfo &&
												order.shippingInfo.phoneNo}
										</span>
									</div>
									<div>
										<p>Address:</p>
										<span>
											{order &&
												order.shippingInfo &&
												`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
										</span>
									</div>
								</div>

								<Typography>Payment</Typography>
								<div className="order-details-container-box">
									<div>
										<p
											className={
												order.paymentInfo &&
												order.paymentInfo.status ===
													"succeeded"
													? "greenColor"
													: "redColor"
											}
										>
											{order.paymentInfo &&
											order.paymentInfo.status ===
												"succeeded"
												? "PAID"
												: "NOT PAID"}
										</p>
									</div>
									<div>
										<p>Amount:</p>
										<span>
											{order.totalPrice &&
												order.totalPrice}
										</span>
									</div>
								</div>

								<Typography>Order Status</Typography>
								<div className="order-details-container-box">
									<div>
										<p
											className={
												order.orderStatus &&
												order.orderStatus ===
													"Delivered"
													? "greenColor"
													: "redColor"
											}
										>
											{order.orderStatus &&
												order.orderStatus}
										</p>
									</div>
								</div>

								<div className="confirm-cart-items">
									<Typography>Your Cart Items:</Typography>
									<div className="confirm-cart-items-container">
										{order.orderItems &&
											order.orderItems.map((item) => (
												<div key={item.product}>
													<img
														src={item.image}
														alt="Product"
													/>
													<Link
														to={`/products/${item.product}`}
													>
														{item.name}
													</Link>
													<span>
														{item.quantity} X ৳
														{item.price} = {""}
														<b>
															৳
															{item.price *
																item.quantity}
														</b>
													</span>
												</div>
											))}
									</div>
								</div>
							</div>
							{/*  */}
							<div
								style={{
									display:
										order.orderStatus === "Delivered"
											? "none"
											: "block",
								}}
							>
								<form
									className="update-order-form"
									encType="multipart/form-data"
									onSubmit={updateOrderSubmitHandler}
								>
									<h1>Process Order</h1>

									<div>
										<AccountTreeIcon />
										<select
											onChange={(e) =>
												setStatus(e.target.value)
											}
										>
											<option value="">
												Choose Category
											</option>
											{order.orderStatus ===
												"Processing" && (
												<option value="Shipped">
													Shipped
												</option>
											)}
											{order.orderStatus ===
												"Shipped" && (
												<option value="Delivered">
													Delivered
												</option>
											)}
										</select>
									</div>

									<Button
										id="create-product-btn"
										type="submit"
										disabled={
											loading
												? true
												: false || status === ""
												? true
												: false
										}
									>
										Process
									</Button>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
			<ToastContainer
				position="bottom-center"
				hideProgressBar={true}
				theme="dark"
				autoClose={1000}
			/>
		</Fragment>
	);
};

export default ProcessOrder;
