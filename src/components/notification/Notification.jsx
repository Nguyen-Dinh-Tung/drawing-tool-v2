import React, { useState } from "react";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  notification: {
    backgroundColor: "#43a047",
    color: "#ffffff",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    maxWidth: "400px",
  },
  closeButton: {
    color: "#ffffff",
  },
}));

const Notification = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}>
      <div className={classes.notification}>
        <span>Success! Your action was completed.</span>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}>
          <CloseIcon className={classes.closeButton} />
        </IconButton>
      </div>
    </Snackbar>
  );
};

export default Notification;
