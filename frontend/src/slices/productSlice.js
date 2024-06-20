import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page : localStorage.getItem("page") ? localStorage.getItem("page") : 1,
    sortOption : localStorage.getItem("sortOption") ? localStorage.getItem("sortOption") : 'lastAdded',
};



const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
            localStorage.setItem("page", JSON.stringify(action.payload));
        },
        setSort: (state, action) => {
            state.sortOption = action.payload;
            localStorage.setItem("sortOption", JSON.stringify(action.payload));
        },
    },
});

export const { setPage, setSort } = productSlice.actions;
export default productSlice.reducer;