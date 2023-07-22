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
import { useNavigate } from "react-router";
import NotesIcon from "@mui/icons-material/Notes";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EngineeringIcon from "@mui/icons-material/Engineering";
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickUser = () => {
    dispatch(setTitle("Users dashboard"));
  };
  const clickReport = () => {
    dispatch(setTitle("Report dashboard"));
  };
  const clickComments = () => {
    dispatch(setTitle("Comments dashboard"));
  };
  const clickRate = () => {
    dispatch(setTitle("Rate dashboard"));
  };
  const clickDecentralization = () => {
    dispatch(setTitle("Decentralization dashboard"));
  };
  const sidebarContent = (
    <Box sx={{ p: 2, width: "240px" }}>
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        Sidebar Content
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

        <ListItem button>
          <ListItemIcon>
            <EngineeringIcon />
          </ListItemIcon>
          <ListItemText primary="Decentralization" onClick={clickRate} />
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
