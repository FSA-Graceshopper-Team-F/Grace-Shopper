import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductAsync = createAsyncThunk("getProduct", async () => {
	try {
		const { data } = await axios.get("/api/products/:productId");
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

export const selectProducts = (state) => {
	return state.products;
};
export default singleProductSlice.reducer;
