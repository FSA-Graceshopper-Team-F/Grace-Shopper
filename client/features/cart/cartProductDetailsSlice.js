import { createSlice } from "@reduxjs/toolkit";

const cartProductDetailsSlice = createSlice({
	name: "cartProductDetails",
	initialState: [],
	reducers: {
		storeProductDetails: (state, action) => {
			return action.payload;
		},
	},
});

export const selectCartProductDetails = (state) => {
	return state.orderDetails;
};

export const { storeProductDetails } = cartProductDetailsSlice.actions;

export default cartProductDetailsSlice.reducer;
