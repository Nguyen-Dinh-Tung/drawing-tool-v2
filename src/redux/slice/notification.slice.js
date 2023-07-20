import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "id",
  initialState: {
    open: true,
    message: "This is a success message!",
    type: "success",
  },
  reducers: {
    setOpen: (state, actions) => {
      state.open = actions.payload;
    },
    setNotification: (state, actions) => {
      state.open = actions.payload.open;
      state.message = actions.payload.message;
      state.type = actions.payload.type;
    },
  },
});
export const { setOpen, setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
