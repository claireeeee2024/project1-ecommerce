import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page : 1,
    sortOption : 'lastAdded',
    searchKeyword: "",
};



const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSortOption: (state, action) => {
            state.sortOption = action.payload;
        },
        setSearchKeyword: (state, action) => {
            state.searchKeyword = action.payload;
        }
    },
});

export const { setPage, setSortOption, setSearchKeyword } = productSlice.actions;
export default productSlice.reducer;