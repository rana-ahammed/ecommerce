import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Cart = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cartItems } = useSelector((state) => state.cart);

	const increaseQuantity = (id, quantity, stock) => {
		const newQty = quantity + 1;
		if (stock <= quantity) {
			return;
		}
		dispatch(addItemsToCart(id, newQty));
	};

	const decreaseQuantity = (id, quantity) => {
		const newQty = quantity - 1;
		if (1 >= quantity) {
			return;
		}
		dispatch(addItemsToCart(id, newQty));
	};

	const deleteCartItems = (id) => {
		dispatch(removeItemsFromCart(id));
	};

	const checkoutHandler = () => {
		navigate("/shipping");
	}

	return (
		<Fragment>
			<MetaData title="Cart Page -- Ecommerce"/>
			{cartItems.length === 0 ? (
				<div className="empty-cart">
					<RemoveShoppingCartIcon />
					<Typography>No Product in Your Cart</Typography>
					<Link to="/products">View Products</Link>
				</div>
			) : (
				<Fragment>
					<div className="cart-page">
						<div className="cart-header">
							<p>Product</p>
							<p>Quantity</p>
							<p>Subtotal</p>
						</div>

						{cartItems &&
							cartItems.map((item) => (
								<div
									className="cart-container"
									key={item.product}
								>
									<CartItemCard
										item={item}
										deleteCartItems={deleteCartItems}
									/>
									<div className="cart-input">
										<button
											onClick={() =>
												decreaseQuantity(
													item.product,
													item.quantity
												)
											}
										>
											-
										</button>
										<input
											type="number"
											value={item.quantity}
											readOnly
										/>
										<button
											onClick={() =>
												increaseQuantity(
													item.product,
													item.quantity,
													item.stock
												)
											}
										>
											+
										</button>
									</div>
									<p className="cart-subtotal">{`৳${
										item.price * item.quantity
									}`}</p>
								</div>
							))}

						<div className="cart-gross-total">
							<div></div>
							<div className="cart-gross-total-box">
								<p>Gross Total</p>
								<p>{`৳${cartItems.reduce(
									(acc, item) =>
										acc + item.price * item.quantity,
									0
								)}`}</p>
							</div>
							<div></div>
							<div className="check-out-btn">
								<button onClick={checkoutHandler} >Check Out</button>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Cart;
