import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import "./Products.css";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";

const categories = [
	"Laptop",
	"Footwear",
	"Bottom",
	"Tops",
	"Attire",
	"Camera",
	"SmartPhones",
];

const Products = () => {
	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState(1);
	const [price, setPrice] = useState([0, 25000]);
	const [category, setCategory] = useState("");
	const [ratings, setRatings] = useState(0);

	const { products, loading, error, productsCount, resultPerPage } =
		useSelector((state) => state.products);

	const { keyword } = useParams();

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};

	useEffect(() => {
		if (error) {
			return toast.error(error);
		}
		dispatch(getProducts(keyword, currentPage, price, category, ratings));
	}, [dispatch, keyword, currentPage, price, category, ratings, error]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="PRODUCTS -- ECOMMERCE" />
					<h3 className="products-heading">Products</h3>
					<div className="products">
						{products &&
							products.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
								/>
							))}
					</div>

					<div className="filter-box">
						<Typography>Price</Typography>
						<Slider
							value={price}
							onChange={(event, newPrice) => {
								setPrice(newPrice);
							}}
							valueLabelDisplay="auto"
							aria-labelledby="range-slider"
							min={0}
							max={25000}
						/>
						<Typography>Categories</Typography>
						<ul className="category-box">
							{categories.map((category) => (
								<li
									className="category-link"
									key={category}
									onClick={() => setCategory(category)}
								>
									{category}
								</li>
							))}
						</ul>

						<fieldset>
							<Typography component="legend">
								Ratings Above
							</Typography>
							<Slider
								value={ratings}
								onChange={(e, newRating) => {
									setRatings(newRating);
								}}
								aria-labelledby="continuous-slider"
								min={0}
								max={5}
								valueLabelDisplay="auto"
							/>
						</fieldset>
					</div>

					{resultPerPage < productsCount && (
						<div className="pagination-box">
							<Pagination
								activePage={currentPage}
								itemsCountPerPage={resultPerPage}
								totalItemsCount={productsCount}
								onChange={setCurrentPageNo}
								prevPageText="<"
								nextPageText=">"
								firstPageText="1st"
								lastPageText="Last"
								itemClass="page-item"
								linkClass="page-link"
								activeClass="page-item-active"
								activeLinkClass="page-link-active"
							/>
						</div>
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

export default Products;
