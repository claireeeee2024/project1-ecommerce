import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qtys: localStorage.getItem("qtys")
    ? JSON.parse(localStorage.getItem("qtys"))
    : 0,
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setQtys: (state, action) => {
      state.qtys = action.payload;
      localStorage.setItem("qtys", JSON.stringify(action.payload));
    },
    setTotal: (state, action) => {
      state.total = action.payload;
      localStorage.setItem("total", JSON.stringify(action.payload));
    },
  },
});

export const { setQtys, setTotal } = cartSlice.actions;
export default cartSlice.reducer;
