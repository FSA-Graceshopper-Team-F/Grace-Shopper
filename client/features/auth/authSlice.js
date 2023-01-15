import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/
const TOKEN = "token";
/*
  THUNKS
*/
export const me = createAsyncThunk("auth/me", async () => {
	const token = window.localStorage.getItem(TOKEN);
	try {
		if (token) {
			const res = await axios.get("/auth/me", {
				headers: {
					authorization: token,
				},
			});
			return res.data;
		} else {
			return {};
		}
	} catch (err) {
		if (err.response.data) {
			return thunkAPI.rejectWithValue(err.response.data);
		} else {
			return "There was an issue with your request.";
		}
	}
});

export const authenticate = createAsyncThunk(
	"auth/authenticate",
	async ({ email, password, method }, thunkAPI) => {
		const { cart } = thunkAPI.getState();
		try {
			const res = await axios.post(`/auth/${method}`, { email, password, cart:cart });
			window.localStorage.setItem(TOKEN, res.data.token);
			thunkAPI.dispatch(me());
		} catch (err) {
			if (err.response.data) {
				return thunkAPI.rejectWithValue(err.response.data);
			} else {
				return "There was an issue with your request.";
			}
		}
	}
);

export const logout = createAsyncThunk("auth/logout", async () => {
	await localStorage.removeItem(TOKEN);
	localStorage.removeItem("cart")
});

/*
  SLICE*/
export const authSlice = createSlice({
	name: "auth",
	initialState: {
		me: {},
		isError: false,
		message: "",
	},
	reducers: {
		reset: (state) => {
			(state.me = {}), (state.isError = false), (state.message = "");
		},
	},
	extraReducers: (builder) => {
		builder.addCase(me.fulfilled, (state, action) => {
			state.me = action.payload;
		});
		builder.addCase(me.rejected, (state, action) => {
			state.isError = action.error;
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.me = {};
		});
		builder.addCase(authenticate.rejected, (state, action) => {
			(state.isError = true), (state.message = action.payload);
		});
	},
});

/*
  ACTIONS
*/
export const { reset } = authSlice.actions;
export const selectAuth = (state) => {
	return state.auth.me;
};

/*
  REDUCER
*/
export default authSlice.reducer;
