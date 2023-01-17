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
export const addProductAsync = createAsyncThunk("addProduct", async (productData) => {
	try{
		const token = window.localStorage.getItem("token")
		const config = {
			headers: {
				Authorization: token
			}
		};
		const { data } = await axios.post("/api/products", productData, config);
		alert('This product is now added to inventory');
		return data;
	}catch(error){
		//Displays alert popup to user
		alert (error.response.data)
	}
});

//Edit Product
export const editProductAsync = createAsyncThunk("editProduct", async( product ) => {
	try{
		const token = window.localStorage.getItem("token")
		const config = {
			headers: {
				Authorization: token
			}
		};
		const { data } = await axios.put(`/api/products/${product.productId}`, product, config);
		return data;
	}catch(error){
		alert(error.response.data)
	}
});



const productsSlice = createSlice({
	name: "products",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProductsAsync.fulfilled, (_state, action) => {
			return action.payload;
		})
		builder.addCase(addProductAsync.fulfilled), (_state, action) => {
			return action.payload;
		}
		builder.addCase(editProductAsync.fulfilled), (_state, action) => {
			return action.payload;
		}
	},
});

export const selectProducts = (state) => {
	return state.products;
};
export default productsSlice.reducer;
