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
const useStyles = makeStyles((theme) => ({
  listItem: {
    border: "solid #ccc",
  },
  itemText: {
    color: "white",
  },
}));
const Sidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const clickUser = () => {
    dispatch(setTitle("Users dashboard"));
    dispatch(setTarget("user"));
  };
  const clickReport = () => {
    dispatch(setTitle("Report dashboard"));
    dispatch(setTarget("report"));
  };
  const clickComments = () => {
    dispatch(setTitle("Comments dashboard"));
    dispatch(setTarget("comments"));
  };
  const clickRate = () => {
    dispatch(setTitle("Rate dashboard"));
    dispatch(setTarget("rate"));
  };

  const sidebarContent = (
    <Box sx={{ p: 2, width: "240px" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: "18px" }}>
        <img
          src="./inkstagram-02.png"
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
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        position: "fixed",
        zIndex: 1,
      }}>
      {sidebarContent}
      <Box
        sx={{
          p: 2,
          width: "240px",
          position: "fixed",
          zIndex: 1,
          bottom: "10px",
        }}>
        <List>
          <ListItem
            button
            sx={{
              marginBottom: "10px",
              display: "flex",
            }}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: "#34de95" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
