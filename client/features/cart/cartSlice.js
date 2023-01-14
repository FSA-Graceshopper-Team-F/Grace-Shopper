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

export const updateCartAsync = createAsyncThunk(
	"updateCart",
	async (_, { getState }) => {
		const token = window.localStorage.getItem('token');
		try {
			const { cart,auth } = getState();
			const { data } = await axios.put(`/api/cart/${auth.me.id}`, {
				headers: {
					authorization: token,
				},
				cart
			});
			return data;
		} catch (error) {
			console.error(error);
		}
	}
);

const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addItem: (state, action) => {
			const { productId, quantity } = action.payload;
			return [...state, { quantity, productId }];
		},
		increaseQuantity: (state, action) => {
			const { productId } = action.payload;
			return state.map((item) =>
				item.productId === productId
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
		},
		decreaseQuantity: (state, action) => {
			const { productId } = action.payload;
			const decreased = state.map((item) =>
				item.productId === productId
					? { ...item, quantity: item.quantity - 1 }
					: item
			);
			return decreased.filter(({ quantity }) => quantity !== 0);
		},
		removeItem: (state, action) => {
			const { productId } = action.payload;
			return state.filter((item) => item.productId !== productId);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCartAsync.fulfilled, (_state, action) => {
			return action.payload.cart;
		});
		builder.addCase(updateCartAsync.fulfilled, (_state, action) => {
			// return action.payload.cart;
		});
	},
});

export const selectCart = (state) => {
	return state.cart;
};
export const { addItem, increaseQuantity, decreaseQuantity, removeItem } =
	cartSlice.actions;

export default cartSlice.reducer;
