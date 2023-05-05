import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";
import Home from "./component/Home/Home";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignup from "./component/User/LoginSignup";
import store from "./Store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import StripePayment from "./component/Cart/StripePayment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrdersList from "./component/Admin/OrdersList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/NotFound.js";

function App() {
	const { isAuthenticated, user } = useSelector((state) => state.user);

	useEffect(() => {
		WebFont.load({
			google: {
				families: ["Roboto", "Droid Sans", "Chilanka"],
			},
		});

		store.dispatch(loadUser());
	}, []);

	window.addEventListener("contextmenu", (e) => e.preventDefault());
	return (
		<Router>
			<Header />

			{isAuthenticated && <UserOptions user={user} />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/product/:id" element={<ProductDetails />} />
				<Route path="/products" element={<Products />} />
				<Route path="/products/:keyword" element={<Products />} />
				<Route path="/search" element={<Search />} />
				<Route path="/password/forgot" element={<ForgotPassword />} />
				<Route
					path="/password/reset/:token"
					element={<ResetPassword />}
				/>
				<Route path="/login" element={<LoginSignup />} />
				<Route path="/cart" element={<Cart />} />

				<Route
					path="/account"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/me/update"
					element={
						<ProtectedRoute>
							<UpdateProfile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/password/update"
					element={
						<ProtectedRoute>
							<UpdatePassword />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/shipping"
					element={
						<ProtectedRoute>
							<Shipping />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/order/confirm"
					element={
						<ProtectedRoute>
							<ConfirmOrder />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/process/payment"
					element={
						<ProtectedRoute>
							<StripePayment />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/success"
					element={
						<ProtectedRoute>
							<OrderSuccess />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/orders"
					element={
						<ProtectedRoute>
							<MyOrders />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/order/:id"
					element={
						<ProtectedRoute>
							<OrderDetails />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/dashboard"
					element={
						<ProtectedRoute adminRoute={true}>
							<Dashboard />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/admin/products"
					element={
						<ProtectedRoute adminRoute={true}>
							<ProductList />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/admin/product"
					element={
						<ProtectedRoute adminRoute={true}>
							<NewProduct />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/admin/product/:id"
					element={
						<ProtectedRoute adminRoute={true}>
							<UpdateProduct />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/orders"
					element={
						<ProtectedRoute adminRoute={true}>
							<OrdersList />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/order/:id"
					element={
						<ProtectedRoute adminRoute={true}>
							<ProcessOrder />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/users"
					element={
						<ProtectedRoute adminRoute={true}>
							<UsersList />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/user/:id"
					element={
						<ProtectedRoute adminRoute={true}>
							<UpdateUser />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/reviews"
					element={
						<ProtectedRoute adminRoute={true}>
							<ProductReviews />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>

			<Footer />
		</Router>
	);
}

export default App;
