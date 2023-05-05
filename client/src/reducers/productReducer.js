import {
	ADMIN_PRODUCT_FAIL,
	ADMIN_PRODUCT_REQUEST,
	ADMIN_PRODUCT_SUCCESS,
	ALL_PRODUCT_FAIL,
	ALL_PRODUCT_REQUEST,
	ALL_PRODUCT_SUCCESS,
	ALL_REVIEW_FAIL,
	ALL_REVIEW_REQUEST,
	ALL_REVIEW_SUCCESS,
	CLEAR_ERRORS,
	DELETE_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_RESET,
	DELETE_PRODUCT_SUCCESS,
	DELETE_REVIEW_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_RESET,
	DELETE_REVIEW_SUCCESS,
	NEW_PRODUCT_FAIL,
	NEW_PRODUCT_REQUEST,
	NEW_PRODUCT_RESET,
	NEW_PRODUCT_SUCCESS,
	NEW_REVIEW_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_RESET,
	NEW_REVIEW_SUCCESS,
	SINGLE_PRODUCT_DETAILS_FAIL,
	SINGLE_PRODUCT_DETAILS_REQUEST,
	SINGLE_PRODUCT_DETAILS_SUCCESS,
	UPDATE_PRODUCT_FAIL,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_RESET,
	UPDATE_PRODUCT_SUCCESS,
} from "../constants/productConstants";

// Get All Products
export const productsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case ALL_PRODUCT_REQUEST:
		case ADMIN_PRODUCT_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case ALL_PRODUCT_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
				productsCount: action.payload.productsCount,
				resultPerPage: action.payload.resultPerPage,
				// filteredProductsCount: action.payload.filteredProductsCount,
			};

		case ADMIN_PRODUCT_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			};
		case ALL_PRODUCT_FAIL:
		case ADMIN_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

// Update Product
export const updateProductReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case UPDATE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};
		case UPDATE_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case UPDATE_PRODUCT_RESET:
			return {
				...state,
				isUpdated: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

// Delete Product
export const productDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case DELETE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};
		case DELETE_PRODUCT_RESET:
			return {
				...state,
				isDeleted: false,
			};
		case DELETE_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

// Get Single Product Details
export const singleProductDetailsReducer = (
	state = { product: {} },
	action
) => {
	switch (action.type) {
		case SINGLE_PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				...state,
			};
		case SINGLE_PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			};
		case SINGLE_PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Create a Product
export const newProductReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case NEW_PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case NEW_PRODUCT_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
				product: action.payload.product,
			};
		case NEW_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NEW_PRODUCT_RESET:
			return {
				...state,
				success: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Create a Review
export const newReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};
		case NEW_REVIEW_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			};
		case NEW_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NEW_REVIEW_RESET:
			return {
				...state,
				success: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

// Get All Reviews of a Product (Admin)
export const productReviewsReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case ALL_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ALL_REVIEW_SUCCESS:
			return {
				...state,
				loading: false,
				reviews: action.payload,
			};
		case ALL_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Delete Review (Admin)
export const deleteReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};
		case DELETE_REVIEW_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};
		case DELETE_REVIEW_RESET:
			return {
				...state,
				isDeleted: false,
			};
		case DELETE_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
