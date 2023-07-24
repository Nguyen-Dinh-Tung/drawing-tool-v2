import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  InputAdornment,
  Pagination,
} from "@mui/material";
import Tables from "../../components/table/Tables";
import { useSelector } from "react-redux";
import Sidebar from "../../components/side-bar/Silde-bar";
import SearchIcon from "@mui/icons-material/Search";
import TableWithPermissions from "../../components/permission/Permission";

const defaultTable = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    height: "159",
    weight: "159",
    height: "159",
    height: "159",
  },
  { id: 2, name: "Jane Smith", age: 25, email: "jane.smith@example.com" },
];
const notificationMock = [
  {
    id: 1,
    name: "John Doe",
    content: "Wow ",
  },
  { id: 2, name: "Jane Smith", content: 25 },
];

const Dashboard = () => {
  const title = useSelector((state) => state.title.title);
  const [currentPage, setCurrentPage] = useState(1);
  const table = useSelector((state) => state.table.target);
  const [data, setData] = useState(defaultTable);
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const selectData = {
    user: defaultTable,
    comments: notificationMock,
    rate: notificationMock,
    report: notificationMock,
  };

  useEffect(() => {
    if (table !== "permission") setData(selectData[table]);
  }, [table]);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "240px",
            justifyContent: "space-between",
          }}>
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "black",
              borderBottom: "3px solid black",
              display: "inline-block",
              paddingBottom: "8px",
              marginRight: "16px",
            }}
            variant="h5"
            component="div"
            gutterBottom>
            {title}
          </Typography>
          <TextField
            sx={{
              width: "300px",
              color: "#ff4081",
            }}
            placeholder="Search"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {table === "permission" ? (
          <TableWithPermissions />
        ) : (
          <Tables data={data} />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: "4%",
          left: "50%",
        }}>
        <Pagination
          count={5}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
