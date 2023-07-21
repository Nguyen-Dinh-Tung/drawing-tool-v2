import React from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "68px",
    height: "100vh",
    width: window.innerWidth,
    display: "flex",
    flexDirection: "column",
  },
  contentTop: {
    height: "40%",
    width: "100%",
    borderBottom: "50px solid white",
    borderLeft: "100vw solid transparent",
  },
  contentBottom: {
    height: "60%",
    width: "100%",
  },

  rectangle: {
    width: "70%",
    height: "70%",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    position: "fixed",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "40px",
  },
  avatar: {
    width: "400px",
    height: "400px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-around",
  },
  inforTop: { display: "flex", justifyContent: "space-between" },
  inforTopRight: { display: "flex" },
  inforTopLeft: { display: "flex" },
  inforContact: { margin: "0 10px" },
  inforBottom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginTop: "160px",
  },
  inforBottomName: {
    fontFamily: "open sans,sans-serif",
    marginBottom: "10px",
  },
  hr: {
    width: "100%",
    marginBottom: "10px",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const contentTopColor = ["#9198e5", "#6875e6", "#ea6196", "#28a6f4"];
  const randomColor = () => {
    console.log(
      contentTopColor[Math.floor(Math.random(contentTopColor.length))]
    );
    return contentTopColor[Math.floor(Math.random(contentTopColor.length))];
  };
  return (
    <div className={classes.container}>
      <div
        className={classes.contentTop}
        style={{
          backgroundColor: randomColor(),
        }}></div>
      <div className={classes.contentBottom}></div>
      <Box className={classes.rectangle}>
        <div className={classes.info}>
          <div className={classes.inforTop}>
            <div className={classes.inforTopRight}>
              <p className={classes.inforContact}>Fack</p>
              <p className={classes.inforContact}>Manager</p>
              <p className={classes.inforContact}>Developer</p>
            </div>
            <div className={classes.inforTopLeft}>
              <p className={classes.inforContact}>tungnd@bytesoft.net</p>
              <p className={classes.inforContact}>0337118801</p>
            </div>
          </div>
          <div className={classes.inforBottom}>
            <h3
              className={classes.inforBottomName}
              style={{
                fontSize: "20px",
              }}>
              Nguyễn Đình Tùng
            </h3>
            <h3 className={classes.inforBottomName}>14/02/1998</h3>
            <hr className={classes.hr} />
            <p className={classes.inforBottomName}>
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </p>
          </div>
        </div>
        <Avatar
          sx={{
            width: "260px",
            height: "260px",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -180%)",
          }}
          alt="Remy Sharp"
          src="./profile-avatar.jpg"
        />
      </Box>
    </div>
  );
};

export default Profile;
