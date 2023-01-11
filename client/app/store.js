import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/product/productSlice";
import singleProductSlice from "../features/product/singleProductSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productsReducer,
		singleProduct: singleProductSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
