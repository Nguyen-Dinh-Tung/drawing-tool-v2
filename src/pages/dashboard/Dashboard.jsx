import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  // Add more users data here
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          marginTop: "68px",
          width: 240,
          zIndex: (theme) => theme.zIndex.drawer,
        }}>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                {/* Add icons for other management options */}
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Users" />
            </ListItem>
            {/* Add more management options */}
          </List>
        </Box>
        <IconButton onClick={handleSidebarClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h5" component="div" gutterBottom>
          User List
        </Typography>
        <TableContainer sx={{ overflowX: "auto" }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditUser(user)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <DialogContentText>Name: {selectedUser.name}</DialogContentText>
              <DialogContentText>Email: {selectedUser.email}</DialogContentText>
              {/* Add more fields for editing user information */}
              <TextField label="Name" value={selectedUser.name} fullWidth />
              <TextField label="Email" value={selectedUser.email} fullWidth />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditDialogClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
