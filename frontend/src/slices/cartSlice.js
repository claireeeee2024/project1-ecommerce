import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: new Map(),
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
    addToCart: (state, action) => {
      console.log(action);
      //   state.items.push(action.payload);
      if (!state.items.has(action.payload._id)) {
        state.items.set(action.payload._id, action.payload);
      }
    },
    addCartItemsQty: (state, action) => {
      const { _id } = action.payload;
      const item = state.items.has(_id);
      if (item) {
        item.qty += 1;
      }
    },
    subCartItemsQty: (state, action) => {
      const { _id } = action.payload;
      const item = state.items.has(_id);
      if (item) {
        item.qty -= 1;
      }
    },
  },
});
export const { setCartItems, addToCart, addCartItemsQty, subCartItemsQty } =
  cartSlice.actions;
export default cartSlice.reducer;
