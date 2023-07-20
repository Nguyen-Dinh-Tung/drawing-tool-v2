import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slice/notification.slice";
export const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});
export default store;
