import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slice/notification.slice";
import loadingReducer from "./slice/loading.slice";
import titleReducer from "./slice/title.slice";
export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    loading: loadingReducer,
    title: titleReducer,
  },
});
export default store;
