import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk("getCart", async (userId) => {
	try {
		const { data } = await axios.get(`/api/users/${userId}`);
		return data;
	} catch (error) {
		console.error(error);
	}
});

export const fetchCartItemsAsync = createAsyncThunk("getCartItems", async (itemsArray) =>{
  try {
    console.log(itemsArray, "thunk items")
    const {data} = await axios.get(`/api/cart/${itemsArray}`);
    return data;
  }catch (error) {
    console.error(error)
  }
})

const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCartAsync.fulfilled, (_state, action) => {
			return action.payload.cart;
		});
    builder.addCase(fetchCartItemsAsync.fulfilled, (_state, action) =>{
      return action.payload;
    });
  }
});

export const selectCart = (state) => {
	return state.cart;
};

export default cartSlice.reducer;