import React, { Fragment, useEffect, useRef } from "react";
import "./Payment.css";
import {
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderAction";

const Payment = () => {
	const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const stripe = useStripe();
	const elements = useElements();
	const payBtn = useRef(null);

	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.user);
	const { error } = useSelector((state) => state.newOrder);

	const paymentData = {
		amount: Math.round(orderInfo.totalPrice * 100),
	};

	const order = {
		shippingInfo,
		orderItems: cartItems,
		itemsPrice: orderInfo.subtotal,
		taxPrice: orderInfo.tax,
		shippingPrice: orderInfo.shippingCharges,
		totalPrice: orderInfo.totalPrice,
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		payBtn.current.disabled = true;

		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await axios.post(
				"/api/v1/payment/process",
				paymentData,
				config
			);

			const client_secret = data.client_secret;

			if (!stripe || !elements) return;

			const result = await stripe.confirmCardPayment(client_secret, {
				payment_method: {
					card: elements.getElement(CardNumberElement),
					billing_details: {
						name: user.name,
						email: user.email,
						address: {
							line1: shippingInfo.address,
							city: shippingInfo.city,
							state: shippingInfo.state,
							postal_code: shippingInfo.pinCode,
							country: shippingInfo.country,
						},
					},
				},
			});

			if (result.error) {
				payBtn.current.disabled = false;

				toast.error(result.error.message);
			} else {
				if (result.paymentIntent.status === "succeeded") {
					order.paymentInfo = {
						id: result.paymentIntent.id,
						status: result.paymentIntent.status,
					};
					dispatch(createOrder(order));

					navigate("/success");
				} else {
					alert.error("There's some issue while processing payment ");
				}
			}
		} catch (error) {
			payBtn.current.disabled = false;
			toast.error(error.response.data.message);
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error]);

	return (
		<Fragment>
			<MetaData title="Payment" />
			<CheckoutSteps activeStep={2} />
			<div className="payment-container">
				<form
					className="payment-form"
					onSubmit={(e) => submitHandler(e)}
				>
					<Typography>Card Info</Typography>
					<div>
						<CreditCardIcon />
						<CardNumberElement className="payment-input" />
					</div>
					<div>
						<EventIcon />
						<CardExpiryElement className="payment-input" />
					</div>
					<div>
						<VpnKeyIcon />
						<CardCvcElement className="payment-input" />
					</div>
					<input
						type="submit"
						ref={payBtn}
						value={`Pay - ৳${orderInfo && orderInfo.totalPrice}`}
						className="payment-form-btn"
					/>
				</form>
			</div>
			<ToastContainer
				position="bottom-center"
				hideProgressBar={true}
				theme="dark"
			/>
		</Fragment>
	);
};

export default Payment;
