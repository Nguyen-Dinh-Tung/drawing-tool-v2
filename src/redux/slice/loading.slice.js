import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    showLoading: (state) => true,
    hideLoading: (state) => false,
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
