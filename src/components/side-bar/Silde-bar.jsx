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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { setTarget } from "../../redux/slice/table.slice";
const Sidebar = () => {
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
  const clickDecentralization = () => {
    dispatch(setTitle("Decentralization dashboard"));
    dispatch(setTarget("permission"));
  };
  const sidebarContent = (
    <Box sx={{ p: 2, width: "240px" }}>
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        Final Project
      </Typography>
      <List>
        <ListItem button onClick={clickUser}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="User" />
        </ListItem>
        <ListItem button onClick={clickReport}>
          <ListItemIcon>
            <ReportGmailerrorredIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>

        <ListItem button onClick={clickComments}>
          <ListItemIcon>
            <NotesIcon />
          </ListItemIcon>
          <ListItemText primary="Comments" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <FavoriteBorderIcon />
          </ListItemIcon>
          <ListItemText primary="Rate" onClick={clickRate} />
        </ListItem>

        <ListItem button onClick={clickDecentralization}>
          <ListItemIcon>
            <EngineeringIcon />
          </ListItemIcon>
          <ListItemText primary="Decentralization" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{ position: "fixed", zIndex: 1 }}>
      {sidebarContent}
    </Drawer>
  );
};

export default Sidebar;
