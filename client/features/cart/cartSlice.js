import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalCost: 0,
};

const cartSlice  = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { price } = action.payload;
      state.items.push(action.payload);
      state.totalQuantity += 1;
      state.totalCost += price * 1 
    },
    removeItem: (state, action) => {
      const { product } = action.payload;
      const index = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (index !== -1) {
        const removedItem = state.items.splice(index, 1);
        state.totalQuantity -= removedItem.quantity;
        state.totalCost -= removedItem.product.price * removedItem.quantity;
      }
    },
    adjustQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const index = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (index !== -1) {
        const targetItem = state.items[index];
        state.totalQuantity += quantity - targetItem.quantity;
        state.totalCost += product.price * (quantity - targetItem.quantity);
        targetItem.quantity = quantity;
      }
    },
  },
});

export const selectCart = (state) => {
	return state.cart}

export const { addItem, removeItem, adjustQuantity } = cartSlice.actions;

export default cartSlice.reducer;
