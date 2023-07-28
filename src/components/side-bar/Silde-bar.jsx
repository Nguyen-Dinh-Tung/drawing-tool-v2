import React from "react";
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slice/title.slice";
import NotesIcon from "@mui/icons-material/Notes";
import { setTarget } from "../../redux/slice/table.slice";
import { makeStyles } from "@mui/styles";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router";
const useStyles = makeStyles((theme) => ({
  listItem: {
    border: "solid #ccc",
  },
  itemText: {
    color: "white",
  },
}));
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickUser = () => {
    dispatch(setTitle("Users dashboard"));
    dispatch(setTarget("user"));
    navigate("/admin/user");
  };
  const clickReport = () => {
    dispatch(setTitle("Report dashboard"));
    dispatch(setTarget("report"));
    navigate("/admin/report");
  };
  const clickComments = () => {
    dispatch(setTitle("Comments dashboard"));
    dispatch(setTarget("comments"));
    navigate("/admin/comments");
  };
  const clickRate = () => {
    dispatch(setTitle("Rate dashboard"));
    dispatch(setTarget("rate"));
    navigate("/admin/rate");
  };
  const logout = () => {
    window.localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  const sidebarContent = (
    <Box sx={{ p: 2, width: "280px" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: "18px" }}>
        <img
          src="/inkstagram-02.png"
          alt="random"
          style={{ maxWidth: "60px" }}
        />
      </Box>
      <List>
        <ListItem
          button
          onClick={clickUser}
          sx={{
            marginBottom: "10px",
          }}>
          <ListItemIcon>
            <PersonIcon sx={{ color: "#34de95" }} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem
          button
          onClick={clickReport}
          sx={{
            marginBottom: "10px",
          }}>
          <ListItemIcon>
            <ReportGmailerrorredIcon sx={{ color: "#34de95" }} />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>

        <ListItem
          button
          onClick={clickComments}
          sx={{
            marginBottom: "10px",
          }}>
          <ListItemIcon>
            <NotesIcon sx={{ color: "#34de95" }} />
          </ListItemIcon>
          <ListItemText primary="Comments" />
        </ListItem>

        <ListItem
          button
          sx={{
            marginBottom: "10px",
            display: "flex",
          }}>
          <ListItemIcon>
            <ThumbUpOffAltIcon sx={{ color: "#34de95" }} />
          </ListItemIcon>
          <ListItemText primary="Rate" onClick={clickRate} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        zIndex: 1,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        top: 0,
        left: 0,
      }}>
      {sidebarContent}
      <List>
        <ListItem
          button
          sx={{
            display: "flex",
          }}
          onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon sx={{ color: "#34de95" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
