import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: [],
    total: 0,
    discount: 0,
    tax: 0,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload.items;
      state.discount = action.payload.discount;
      state.tax = action.payload.tax;
      state.total = action.payload.total;
    },
  },
});
export const { setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
