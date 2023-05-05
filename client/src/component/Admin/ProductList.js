import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Sidebar from "../Admin/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import {
	clearErrors,
	deleteProduct,
	getAdminProduct,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, products } = useSelector((state) => state.products);
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.productDelete
	);

	const deleteProductHandler = (id) => {
		dispatch(deleteProduct(id));
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			toast.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			toast.success("Product Deleted Successfully");
			navigate("/admin/dashboard");
			dispatch({ type: DELETE_PRODUCT_RESET });
		}
		dispatch(getAdminProduct());
	}, [dispatch, error, deleteError, isDeleted, navigate]);
	const columns = [
		{ field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },
		{ field: "name", headerName: "Name", minWidth: 350, flex: 1 },
		{
			field: "stock",
			headerName: "Stock",
			type: "number",
			minWidth: 150,
			flex: 0.3,
		},
		{
			field: "price",
			headerName: "Price",
			type: "number",
			minWidth: 270,
			flex: 0.5,
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
						<Link to={`/admin/product/${params.row.id}`}>
							<EditIcon />
						</Link>

						<Button
							onClick={() => deleteProductHandler(params.row.id)}
						>
							<DeleteIcon />
						</Button>
					</Fragment>
				);
			},
		},
	];

	const rows = [];

	products &&
		products.forEach((item) => {
			rows.push({
				id: item._id,
				stock: item.Stock,
				price: item.price,
				name: item.name,
			});
		});
	return (
		<Fragment>
			<MetaData title={"All Products --- Admin"} />
			<div className="dashboard">
				<Sidebar />
				<div className="product-list-container">
					<h1 className="product-list-heading">ALL PRODUCTS</h1>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						className="product-list-table"
						autoHeight
						rowsPerPageOptions={[10]}
					/>
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

export default ProductList;
