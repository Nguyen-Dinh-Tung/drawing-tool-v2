import { useDispatch } from "react-redux";
import { setNotification } from "../redux/slice/notification.slice";

export const useNotification = () => {
  const dispatch = useDispatch();
  const createNotification = (open, message, type) => {
    dispatch(
      setNotification({
        open: open,
        message: message,
        type: type,
      })
    );
  };
  return [createNotification];
};
