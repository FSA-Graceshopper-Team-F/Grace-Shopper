import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrderHistoryAsync = createAsyncThunk("getOrderHistory", async () => {
	try {
		const token = window.localStorage.getItem('token');
        if(token){
            const { data } = await axios.get("/api/orders/myorders",{
                headers:{
                    authorization: token,
                }
            });
            return data;
        }
		
	} catch (error) {
		console.error(error);
	}
});

const orderSlice = createSlice({
	name: "users",
	initialState: [],
	reducers:{},
	extraReducers: (builder) => {
		builder.addCase(fetchOrderHistoryAsync.fulfilled, (_state, action) => {
			return action.payload;
		});
	},
});

export const selectOrders = (state) => {
	return state.order;
};


export default orderSlice.reducer;