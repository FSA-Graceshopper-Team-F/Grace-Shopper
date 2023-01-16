import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const locallyStoredCart = window.localStorage.getItem("cart");
const localStorageCart = JSON.parse(locallyStoredCart);
export const fetchCartAsync = createAsyncThunk("getCart", async (userId) => {
	const localCart = window.localStorage.getItem("cart");
	const localCartParsed = JSON.parse(localCart);
	const token = window.localStorage.getItem("token");
	if (localCart && localCartParsed.length) {
		try {
			return localCart;
		} catch (error) {
			console.error(error);
		}
	}
	try {
		const { data } = await axios.get(`/api/users/${userId}`, {
			headers: {
				authorization: token,
			},
		});
		return data;
	} catch (error) {
		console.error(error);
	}
});

export const updateCartAsync = createAsyncThunk(
	"updateCart",
	async (_, { getState }) => {
		const { cart, auth } = getState();
		try {
			const token = window.localStorage.getItem("token");
			const { data } = await axios.put(`/api/cart/${auth.me.id}`, cart, {
				headers: {
					authorization: token,
				},
			});
			return data;
		} catch (error) {
			console.error(error);
		}
	}
);
export const updateCartLocalAsync = createAsyncThunk(
	"updateCartLocal",
	async (_, { getState }) => {
		const { cart } = getState();
		try {
			return window.localStorage.setItem("cart", JSON.stringify(cart));
		} catch (error) {
			console.error(error);
		}
	}
);
export const cartToOrderAsync = createAsyncThunk(
	"cartToOrder",
	async (address, { getState }) => {
		const token = window.localStorage.getItem("token");
		const { cart, orderDetails } = getState();
		try {
			if (token) {
				const { data } = await axios.post(
					`/api/orders/newOrder`,
					{ address, cart, orderDetails },
					{
						headers: {
							authorization: token,
						},
					}
				);
				return data;
			}
			const { data } = await axios.post("/api/orders/newOrder", {
				address,
				cart,
			});
			return data;
		} catch (error) {
			console.error(error);
		}
	}
);

const cartSlice = createSlice({
	name: "cart",
	initialState:
		localStorageCart && localStorageCart.length ? localStorageCart : [],
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
		clearCartOnLogout: (state, action) => {
			return (state = []);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCartAsync.fulfilled, (_state, action) => {
			return action.payload.cart;
		});
		builder.addCase(updateCartAsync.fulfilled, (_state, action) => {
			return action.payload.cart;
		});
		builder.addCase(cartToOrderAsync.fulfilled, (_state, action) => {
			return [];
		});
		builder.addCase(updateCartLocalAsync.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const selectCart = (state) => {
	return state.cart;
};
export const {
	addItem,
	increaseQuantity,
	decreaseQuantity,
	removeItem,
	clearCartOnLogout,
} = cartSlice.actions;

export default cartSlice.reducer;
