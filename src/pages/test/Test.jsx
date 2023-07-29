import { makeStyles } from "@mui/styles";
import React from "react";
const style = makeStyles((theme) => ({
  container: {
    height: "80vh",
    width: "80vw",
    backgroundColor: "black",
    position: "absolute",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  disalog: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    width: "80%",
  },
}));
function Test({ open, onClose }) {
  const classes = style();
  return (
    <div className={classes.overlay}>
      <div className={classes.disalog}>
        <div className={classes.image}>
          <img
            src={"/logo192.png"}
            alt="Enlarged Image"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Test;
