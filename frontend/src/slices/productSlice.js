import {PRODUCTS_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({page, limit, sort}) => ({
                url: PRODUCTS_URL,
                params: { page, limit, sort },
                method: "GET",
            }),
            providesTags: ["Product"],
        }),
        getProductById: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: "GET",
            }),
            providesTags: ["Product"],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: PRODUCTS_URL,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),
    }),

});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApiSlice;