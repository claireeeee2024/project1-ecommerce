// import { createSlice } from "@reduxjs/toolkit";
// const cartSlice = createSlice({
//   name: "Cart",
//   initialState: {
//     items: new Map(),
//     total: 0,
//     discount: 0,
//     tax: 0,
//   },
//   reducers: {
//     setCartItems: (state, action) => {
//       state.items = action.payload.items;
//       state.discount = action.payload.discount;
//       state.tax = action.payload.tax;
//       state.total = action.payload.total;
//     },
//     addToCart: (state, action) => {
//       console.log(action);
//       //   state.items.push(action.payload);
//       if (!state.items.has(action.payload._id)) {
//         state.items.set(action.payload._id, action.payload);
//       }
//     },
//     addCartItemsQty: (state, action) => {
//       const { _id } = action.payload;
//       const item = state.items.has(_id);
//       if (item) {
//         item.qty += 1;
//       }
//     },
//     subCartItemsQty: (state, action) => {
//       const { _id } = action.payload;
//       const item = state.items.has(_id);
//       if (item) {
//         item.qty -= 1;
//       }
//     },
//   },
// });
// export const { setCartItems, addToCart, addCartItemsQty, subCartItemsQty } =
//   cartSlice.actions;
// export default cartSlice.reducer;

import { CARTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: ({ id }) => ({
        url: `${CARTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    getItem: builder.query({
      query: ({ userId, itemId }) => ({
        url: `${CARTS_URL}/${userId}/${itemId}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    createCartItem: builder.mutation({
      query: (data) => ({
        url: CARTS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation({
      query: (data) => ({
        url: CARTS_URL,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCartItem: builder.mutation({
      query: (data) => ({
        url: `${CARTS_URL}/`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartsQuery,
  useCreateCartItemMutation,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
  useGetItemQuery,
} = cartApiSlice;
