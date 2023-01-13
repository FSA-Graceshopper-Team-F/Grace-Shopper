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

const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addItem: (state, action) => {
			const { productId, quantity } = action.payload;
			state.push({ quantity, productId });
		  },
		  increaseQuantity: (state, action) => {
			const { productId } = action.payload;
			state.map(item => {
				if (item.productId === productId){
					return {item, productId: productId, quantity:item.quantity+=1}
				}
			})
		  },
		  decreaseQuantity: (state, action) => {
			console.log("hit slice")
			const { productId } = action.payload;
			state.map(item => {
				if (item.productId === productId){
					return {item, productId: productId, quantity:item.quantity-=1}
				}
			})
		  },
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCartAsync.fulfilled, (_state, action) => {
			return action.payload.cart;
		});
  }
});

export const selectCart = (state) => {
	return state.cart;
};
export const { addItem,increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;