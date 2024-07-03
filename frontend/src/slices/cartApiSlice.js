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
