import { createSlice } from "@reduxjs/toolkit";

const titleSlice = createSlice({
  name: "title",
  initialState: {
    title: "User dashboard",
  },
  reducers: {
    setTitle: (state, actions) => {
      state.title = actions.payload;
    },
  },
});

export const { setTitle } = titleSlice.actions;
export default titleSlice.reducer;
