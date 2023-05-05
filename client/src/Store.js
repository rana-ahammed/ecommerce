import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
	deleteReviewReducer,
	newProductReducer,
	newReviewReducer,
	productDeleteReducer,
	productReviewsReducer,
	productsReducer,
	singleProductDetailsReducer,
	updateProductReducer,
} from "./reducers/productReducer";
import {
	allUsersReducer,
	deleteUserReducer,
	forgotPasswordReducer,
	profileReducer,
	updateUserReducer,
	userDetailsReducer,
	userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
	allOrdersReducer,
	myOrdersReducer,
	newOrderReducer,
	orderDetailsReducer,
	orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
	products: productsReducer,
	productDetails: singleProductDetailsReducer,
	user: userReducer,
	profile: profileReducer,
	forgotPassword: forgotPasswordReducer,
	cart: cartReducer,
	newOrder: newOrderReducer,
	myOrders: myOrdersReducer,
	orderDetails: orderDetailsReducer,
	newReview: newReviewReducer,
	newProduct: newProductReducer,
	productDelete: productDeleteReducer,
	productUpdate: updateProductReducer,
	allOrders: allOrdersReducer,
	order: orderReducer,
	allUsers: allUsersReducer,
	userDetails: userDetailsReducer,
	userUpdate: updateUserReducer,
	userDelete: deleteUserReducer,
	productReviews: productReviewsReducer,
	reviewDelete: deleteReviewReducer,
});

let initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
		shippingInfo: localStorage.getItem("shippingInfo")
			? JSON.parse(localStorage.getItem("shippingInfo"))
			: {},
	},
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
