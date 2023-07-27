import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slice/notification.slice";
import loadingReducer from "./slice/loading.slice";
import titleReducer from "./slice/title.slice";
import tableReducer from "./slice/table.slice";
import modalReducer from "./slice/modal.slice";
import authReducer from "./slice/auth.slice";
import targetReducer from "./slice/target.slice";
export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    loading: loadingReducer,
    title: titleReducer,
    table: tableReducer,
    modal: modalReducer,
    auth: authReducer,
    target: targetReducer,
  },
});
export default store;
