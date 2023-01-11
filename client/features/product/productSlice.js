import {
	createSlice,
	createAsyncThunk,
	bindActionCreators,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsAsync = createAsyncThunk("getProducts", async () => {
	try {
		const { data } = await axios.get("/api/products");
		return data;
	} catch (error) {
		console.error(error);
	}
});

const productsSlice = createSlice({
	name: "products",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProductsAsync.fulfilled, (_state, action) => {
			return action.payload;
		});
	},
});

export const selectProducts = (state) => {
    return state.products;
};
export default productsSlice.reducer;