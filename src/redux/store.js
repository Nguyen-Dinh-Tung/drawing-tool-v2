import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slice/notification.slice";
import loadingReducer from "./slice/loading.slice";
export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    loading: loadingReducer,
  },
});
export default store;
