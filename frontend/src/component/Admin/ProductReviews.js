import React, { Fragment, useEffect, useState } from "react";
import "./ProductReview.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Sidebar from "../Admin/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import {
	clearErrors,
	deleteReview,
	getAllReviews,
} from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import StarIcon from "@mui/icons-material/Star";

const ProductReviews = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.reviewDelete
	);
	const { error, reviews, loading } = useSelector(
		(state) => state.productReviews
	);

	const [productId, setProductId] = useState("");

	const deleteReviewsHandler = (reviewId) => {
		dispatch(deleteReview(reviewId, productId));
	};

	const productReviewsSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(getAllReviews(productId));
	};

	useEffect(() => {
		if (productId.length === 24) {
			dispatch(getAllReviews(productId));
		}
		if (error) {
			toast.error(error, {
				toastId: "success1",
			});
			dispatch(clearErrors());
		}

		if (deleteError) {
			toast.error(deleteError, {
				toastId: "success1",
			});
			dispatch(clearErrors());
		}

		if (isDeleted) {
			toast.success("Review Deleted Successfully", {
				toastId: "success1",
			});
			navigate("/admin/reviews");
			dispatch({ type: DELETE_REVIEW_RESET });
		}
	}, [dispatch, error, deleteError, isDeleted, navigate, productId]);
	const columns = [
		{ field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
		{ field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
		{
			field: "comment",
			headerName: "Comment",
			minWidth: 350,
			flex: 0.6,
		},
		{
			field: "rating",
			headerName: "Rating",
			type: "number",
			minWidth: 180,
			flex: 0.4,
			cellClassName: (params) => {
				return params.row.rating >= 3 ? "greenColor" : "redColor";
			},
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
						<Button
							onClick={() => deleteReviewsHandler(params.row.id)}
						>
							<DeleteIcon />
						</Button>
					</Fragment>
				);
			},
		},
	];

	const rows = [];

	reviews &&
		reviews.forEach((item) => {
			rows.push({
				id: item._id,
				rating: item.rating,
				comment: item.comment,
				user: item.name,
			});
		});
	return (
		<Fragment>
			<MetaData title={"All REVIEWS --- Admin"} />
			<div className="dashboard">
				<Sidebar />
				<div className="product-reviews-container">
					<form
						className="product-reviews-form"
						encType="multipart/form-data"
						onSubmit={productReviewsSubmitHandler}
					>
						<h1 className="product-reviews-form-heading">
							All Reviews
						</h1>
						<div>
							<StarIcon />
							<input
								type="text"
								placeholder="Product Id"
								required
								value={productId}
								onChange={(e) => setProductId(e.target.value)}
							/>
						</div>

						<Button
							id="create-product-btn"
							type="submit"
							disabled={
								loading
									? true
									: false || productId === ""
									? true
									: false
							}
						>
							Search
						</Button>
					</form>
					{reviews && reviews.length > 0 ? (
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={10}
							disableSelectionOnClick
							className="product-list-table"
							autoHeight
							rowsPerPageOptions={[10]}
						/>
					) : (
						<h1 className="product-reviews-form-heading">
							No Reviews Found
						</h1>
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

export default ProductReviews;
