import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    target: "user",
  },
  reducers: {
    setTarget: (state, actions) => {
      state.target = actions.payload;
    },
  },
});

export const { setTarget } = tableSlice.actions;
export default tableSlice.reducer;
