import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsAsync = createAsyncThunk("getProducts", async () => {
	try {
		const { data } = await axios.get("/api/products");
		return data;
	} catch (error) {
		console.error(error);
	}
});

//Create Product
export const addProductAsync = createAsyncThunk(
	"addProduct",
	async (productData) => {
		try {
			const token = window.localStorage.getItem("token");
			const config = {
				headers: {
					Authorization: token,
				},
			};
			const { data } = await axios.post("/api/products", productData, config);
			alert("This product is now added to inventory");
			return data;
		} catch (error) {
			//Displays alert popup to user
			alert(error.response.data);
		}
	}
);

//Delete Product
export const deleteProductAsync = createAsyncThunk(
	"deleteProduct",
	async (productId) => {
		try {
			const token = window.localStorage.getItem("token");
			const config = {
				headers: {
					Authorization: token,
				},
			};
			const { data } = await axios.delete(`/api/products/${productId}`, config);
			return data;
		} catch (error) {
			throw new Error(error);
		}
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState: [],
	reducers: {
		sortByCategory(state, action) {
			return state.filter((product) => {
				if (product.category === action.payload) {
					return true;
				}
			});
		},
		sortBySearch(state, action) {
			console.log(action.payload);
			const filtered = state.filter(({ name }) => {
				if (name.toLowerCase().includes(action.payload)) {
					return true;
				}
			});
			return filtered;
			console.log(filtered);
		},
		sortAZ(state, action) {
			return state.sort((a, b) =>
				a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
			);
		},

		sortZA(state, action) {
			return state.sort((a, b) =>
				a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
			);
		},
		sortPriceAsc(state, action) {
			return state.sort((a, b) =>
				a.price - b.price
			);
		},
		sortPriceDesc(state, action) {
			return state.sort((a, b) =>
			b.price - a.price
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProductsAsync.fulfilled, (_state, action) => {
			return action.payload;
		});
		builder.addCase(addProductAsync.fulfilled),
			(state, action) => {
				return state;
			};
		builder.addCase(deleteProductAsync.fulfilled),
			(_state, action) => {
				return action.payload;
			};
	},
});

export const { sortByCategory, sortBySearch,sortAZ,sortZA,sortPriceAsc,sortPriceDesc } = productsSlice.actions;

export const selectProducts = (state) => {
	return state.products;
};
export default productsSlice.reducer;
