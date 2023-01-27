import React, { Fragment, useEffect } from "react";
import { BiMouse } from "react-icons/bi";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
	const dispatch = useDispatch();
	const { loading, error, products } = useSelector((state) => state.products);
	useEffect(() => {
		if (error) {
			return toast.error(error);
		}
		dispatch(getProducts());
	}, [dispatch, error]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="Ecommerce" />
					<div className="banner">
						<p>Welcome to Ecommerce</p>
						<h1>FIND AMAZING PRODUCTS BELOW</h1>
						<a href="#container">
							<button>
								Scroll <BiMouse />
							</button>
						</a>
					</div>
					<h2 className="home-heading">Featured Products</h2>

					<div className="container" id="container">
						{products &&
							products.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
								/>
							))}
					</div>
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

export default Home;
