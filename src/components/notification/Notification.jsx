import React from "react";
import { Snackbar, Stack, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../redux/slice/notification.slice";

const Notification = () => {
  const open = useSelector((res) => res.notification.open);
  const type = useSelector((res) => res.notification.type);
  const message = useSelector((res) => res.notification.message);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Notification;
