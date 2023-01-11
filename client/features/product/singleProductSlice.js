import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductAsync = createAsyncThunk("getProduct", async (id) => {
	try {
		const { data } = await axios.get(`/api/products/${id}`);
		return data;
	} catch (error) {
		console.error(error);
	}
});

const singleProductSlice = createSlice({
	name: "singleproduct",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProductAsync.fulfilled, (_state, action) => {
			return action.payload;
		});
	},
});

export const selectSingleProduct = (state) => {
	return state.singleProduct;
};
export default singleProductSlice.reducer;
