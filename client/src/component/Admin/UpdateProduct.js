import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	getSingleProductDetails,
	updateProduct,
} from "../../actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { error, product } = useSelector((state) => state.productDetails);
	const {
		loading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.productUpdate);

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [Stock, setStock] = useState(0);
	const [images, setImages] = useState([]);
	const [oldImages, setOldImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);

	const categories = [
		"Laptop",
		"Footwear",
		"Bottom",
		"Tops",
		"Attire",
		"Camera",
		"SmartPhones",
	];

	useEffect(() => {
		if (product && product._id !== id) {
			dispatch(getSingleProductDetails(id));
		} else {
			setName(product.name);
			setDescription(product.description);
			setPrice(product.price);
			setCategory(product.category);
			setStock(product.Stock);
			setOldImages(product.images);
		}

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			toast.error(updateError);
			dispatch(clearErrors());
		}
		if (isUpdated) {
			toast.success("Product Updated Successfully");
			navigate("/admin/products");
			dispatch({ type: UPDATE_PRODUCT_RESET });
		}
	}, [error, dispatch, navigate, isUpdated, id, product, updateError]);

	const updateProductSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("price", price);
		myForm.set("description", description);
		myForm.set("category", category);
		myForm.set("Stock", Stock);

		images.forEach((image) => {
			myForm.append("images", image);
		});
		dispatch(updateProduct(id, myForm));
	};

	const updateProductImagesChange = (e) => {
		const files = Array.from(e.target.files);

		setImages([]);
		setImagesPreview([]);
		setOldImages([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview((old) => [...old, reader.result]);
					setImages((old) => [...old, reader.result]);
				}
			};
			reader.readAsDataURL(file);
		});
	};

	return (
		<Fragment>
			<MetaData title="Update Product" />
			<div className="dashboard">
				<Sidebar />
				<div className="new-product-container">
					<form
						className="create-product-form"
						encType="multipart/form-data"
						onSubmit={updateProductSubmitHandler}
					>
						<h1>Update Product</h1>

						<div>
							<SpellcheckIcon />
							<input
								type="text"
								placeholder="Product Name"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<AttachMoneyIcon />
							<input
								type="number"
								placeholder="Price"
								required
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>

						<div>
							<DescriptionIcon />

							<textarea
								placeholder="Product Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								cols="30"
								rows="1"
							></textarea>
						</div>

						<div>
							<AccountTreeIcon />
							<select
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
								<option value="">Choose Category</option>
								{categories.map((cate) => (
									<option key={cate} value={cate}>
										{cate}
									</option>
								))}
							</select>
						</div>

						<div>
							<StorageIcon />
							<input
								type="number"
								placeholder="Stock"
								required
								value={Stock}
								onChange={(e) => setStock(e.target.value)}
							/>
						</div>

						<div id="create-product-form-file">
							<input
								type="file"
								name="avatar"
								accept="image/*"
								onChange={updateProductImagesChange}
								multiple
							/>
						</div>

						<div id="create-product-form-image">
							{oldImages &&
								oldImages.map((image, index) => (
									<img
										key={index}
										src={image.url}
										alt="Old Product Review"
									/>
								))}
						</div>

						<div id="create-product-form-image">
							{imagesPreview.map((image, index) => (
								<img
									key={index}
									src={image}
									alt="Product Preview"
								/>
							))}
						</div>

						<Button
							id="create-product-btn"
							type="submit"
							disabled={loading ? true : false}
						>
							Update
						</Button>
					</form>
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

export default UpdateProduct;
