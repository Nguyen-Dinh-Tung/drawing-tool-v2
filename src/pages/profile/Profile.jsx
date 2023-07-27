import "./index.css";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { getMeApi } from "../../api/auth.api";
import { useNotification } from "../../helper/notification";
const followButtonStyle = {
  width: "120px",
  height: "40px",
  marginRight: "10px",
  border: "1px solid #3486d7",
};
const getRandomHexColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const colorArray = [];
for (let i = 0; i < 100; i++) {
  const randomColor = getRandomHexColor();
  colorArray.push(randomColor);
}
const messageButtonStyle = {
  width: "120px",
  height: "40px",
  border: "1px solid #3486d7",
};
const FollowButton = (props) => {
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorArray.length);
    return colorArray[randomIndex];
  };
  return (
    <Button
      sx={followButtonStyle}
      onClick={() => {
        props.changeBgColor(getRandomColor());
      }}>
      Follow
    </Button>
  );
};

const MessageButton = (props) => {
  return (
    <Button
      sx={{
        ...messageButtonStyle,
      }}
      onClick={() => {
        props.changeBgColor();
      }}>
      Inbox
    </Button>
  );
};
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
    display: "inline-block",
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
  controlInfor: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  inforTop: {},
  inforTopRight: { display: "flex", marginBottom: "20px" },
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
  const [isHovered, setIsHovered] = useState(false);
  const [bgColor, setBgColor] = useState("#E91E63");
  const [profile, setProfile] = useState();
  const [createNotification] = useNotification();
  const changeBgColor = (data) => {
    setBgColor(data);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const gender = {
    0: "Female",
    1: "Male",
    3: "Other",
  };
  useEffect(() => {
    getMeApi()
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
        }
        setProfile(res.data.result);
      })
      .catch((e) => {
        if (e) {
          createNotification(true, e.response.data.message, "error");
        }
      });
  }, []);
  return (
    <div className={classes.container}>
      <div
        className={classes.contentTop}
        // style={{
        //   backgroundColor:
        //     profile && profile.gender === 0
        //       ? "rgb(233, 30, 99)"
        //       : profile.gender === 1
        //       ? "#34de95"
        //       : "",
        // }}
      ></div>
      <div className={classes.contentBottom}></div>
      <Box className={classes.rectangle}>
        <div className={classes.info}>
          <div className={classes.controlInfor}>
            <div className={classes.inforTop}>
              <div className={classes.inforTopRight}>
                <p className={classes.inforContact}>
                  {profile && gender[profile.gender]}
                </p>
                <p className={classes.inforContact}>Manager</p>
                <p className={classes.inforContact}>
                  {profile && profile.code ? profile.code : "None"}
                </p>
              </div>
              <div className={classes.inforTopLeft}>
                <p className={classes.inforContact}>
                  {profile && profile.email}
                </p>
                <p className={classes.inforContact}>
                  {profile && profile.phoneNumber}
                </p>
              </div>
            </div>
            <div className="button-group">
              <FollowButton changeBgColor={changeBgColor} />
              <MessageButton changeBgColor={changeBgColor} />
            </div>
          </div>
          <div className={classes.inforBottom}>
            <h3
              className={classes.inforBottomName}
              style={{
                fontSize: "20px",
              }}>
              {profile && profile.name}
            </h3>
            <h3 className={classes.inforBottomName}>
              {profile && new Date(profile.birthDay).toDateString()}
            </h3>
            <hr className={classes.hr} />
            <p className={classes.inforBottomName}>
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </p>
          </div>
        </div>
        <div
          className={`avatar-container ${isHovered ? "hovered" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translate(-50%, -20%)",
          }}>
          <Avatar
            sx={{
              width: "260px",
              height: "260px",
              cursor: "pointer",
            }}
            alt="Remy Sharp"
            src={
              profile && profile.avatar
                ? profile.avatar
                : "./profile-avatar.jpg"
            }
          />
        </div>
      </Box>
    </div>
  );
};

export default Profile;
