import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "loading",
  initialState: {
    content: "form-login",
    open: false,
  },
  reducers: {
    setModal: (state, actions) => {
      state.content = actions.payload.content;
      state.open = actions.payload.open;
    },
    hiddenModal: (state, actions) => {
      state.open = false;
    },
  },
});

export const { hiddenModal, setModal } = modalSlice.actions;
export default modalSlice.reducer;
