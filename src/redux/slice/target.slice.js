import { createSlice } from "@reduxjs/toolkit";

const targetSlice = createSlice({
  name: "target",
  initialState: {
    user: {},
  },
  reducers: {
    setUserTarget: (state, actions) => {
      state.user = { ...actions.payload };
    },
  },
});

export const { setUserTarget } = targetSlice.actions;
export default targetSlice.reducer;
