import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/product/productSlice";
import cartSlice from "../features/cart/cartSlice";
import singleProductSlice from "../features/product/singleProductSlice";
import usersReducer from "../features/users/usersSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productsReducer,
		singleProduct: singleProductSlice,
		cart: cartSlice,
		users: usersReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
