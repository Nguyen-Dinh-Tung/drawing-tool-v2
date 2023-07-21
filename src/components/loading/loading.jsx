// LoadingOverlay.js
import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
}));

const Loading = () => {
  const classes = useStyles();
  const loading = useSelector((state) => state.loading);

  if (!loading) return null;

  return (
    <div className={classes.overlay}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
