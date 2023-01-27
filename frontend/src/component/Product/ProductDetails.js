import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	clearErrors,
	getSingleProductDetails,
	newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { product, loading, error } = useSelector(
		(state) => state.productDetails
	);

	const { success, error: reviewError } = useSelector(
		(state) => state.newReview
	);

	const options = {
		size: "large",
		value: product.ratings,
		readOnly: true,
		precision: 0.5,
	};

	const [quantity, setQuantity] = useState(1);
	const [open, setOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const increaseQuantity = () => {
		if (product.Stock <= quantity) return;

		const qty = quantity + 1;
		setQuantity(qty);
	};

	const decreaseQuantity = () => {
		if (1 >= quantity) return;
		const qty = quantity - 1;
		setQuantity(qty);
	};

	const addToCartHandler = () => {
		dispatch(addItemsToCart(id, quantity));
		toast.success("Item added to Cart");
	};

	const submitReviewToggle = () => {
		open ? setOpen(false) : setOpen(true);
	};

	const reviewSubmitHandler = () => {
		const myForm = new FormData();

		myForm.set("rating", rating);
		myForm.set("comment", comment);
		myForm.set("productId", id);

		dispatch(newReview(myForm));
		setOpen(false);
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (reviewError) {
			toast.error(reviewError);
			dispatch(clearErrors());
		}

		if (success) {
			toast.success("Review has been submitted successfully");
			dispatch({ type: NEW_REVIEW_RESET });
		}
		dispatch(getSingleProductDetails(id));
	}, [dispatch, id, error, reviewError, success]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={`${product.name} -- ECOMMERCE`} />
					<div className="product-details">
						<div>
							<Carousel>
								{product.images &&
									product.images.map((item, i) => (
										<img
											className="carousel-image"
											key={i}
											src={item.url}
											alt={`${i} Slide`}
										/>
									))}
							</Carousel>
						</div>

						<div>
							<div className="details-block-1">
								<h2>{product.name}</h2>
								<p>Product # {product._id}</p>
							</div>
							<div className="details-block-2">
								<Rating {...options} />
								<span className="detailsBlock-2-span">
									{" "}
									({product.numOfReviews} Reviews)
								</span>
							</div>
							<div className="details-block-3">
								<h1>{`₹${product.price}`}</h1>
								<div className="details-block-3-1">
									<div className="details-block-3-1-1">
										<button onClick={decreaseQuantity}>
											-
										</button>
										<input
											readOnly
											type="number"
											value={quantity}
										/>
										<button onClick={increaseQuantity}>
											+
										</button>
									</div>
									<button
										disabled={
											product.Stock < 1 ? true : false
										}
										onClick={addToCartHandler}
									>
										Add to Cart
									</button>
								</div>

								<p>
									Status:
									<b
										className={
											product.Stock < 1
												? "redColor"
												: "greenColor"
										}
									>
										{product.Stock < 1
											? "OutOfStock"
											: "InStock"}
									</b>
								</p>
							</div>

							<div className="detailsBlock-4">
								Description : <p>{product.description}</p>
							</div>

							<button
								onClick={submitReviewToggle}
								className="submit-review"
							>
								Submit Review
							</button>
						</div>
					</div>

					<h3 className="reviews-heading">REVIEWS</h3>

					<Dialog
						aria-labelledby="simple-dialog-title"
						open={open}
						onClose={submitReviewToggle}
					>
						<DialogTitle>Submit Review</DialogTitle>
						<DialogContent className="submit-dialog">
							<Rating
								onChange={(e) => setRating(e.target.value)}
								value={rating}
								size="large"
							/>

							<textarea
								className="submit-dialog-text-area"
								cols="30"
								rows="5"
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							></textarea>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={submitReviewToggle}
								color="secondary"
							>
								Cancel
							</Button>
							<Button
								onClick={reviewSubmitHandler}
								color="primary"
							>
								Submit
							</Button>
						</DialogActions>
					</Dialog>

					{product.reviews && product.reviews[0] ? (
						<div className="reviews">
							{product.reviews &&
								product.reviews.map((review) => (
									<ReviewCard
										key={review._id}
										review={review}
									/>
								))}
						</div>
					) : (
						<p className="no-reviews">No Reviews Yet</p>
					)}
				</Fragment>
			)}
			<ToastContainer
				position="bottom-center"
				hideProgressBar={true}
				theme="dark"
			/>
		</Fragment>
	);
};

export default ProductDetails;
