import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Pagination,
} from "@mui/material";
import Tables from "../../components/table/Tables";
import { useSelector } from "react-redux";
import Sidebar from "../../components/side-bar/Silde-bar";
import SearchIcon from "@mui/icons-material/Search";
import TableWithPermissions from "../../components/permission/Permission";
import { useNotification } from "../../helper/notification";
import { findAll } from "../../api/user.api";

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

const Dashboard = () => {
  const title = useSelector((state) => state.title.title);
  const [currentPage, setCurrentPage] = useState(1);
  const table = useSelector((state) => state.table.target);
  const [data, setData] = useState(defaultTable);
  const [createNotification] = useNotification();
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const filter = {
      filter: {
        searchField: "",
        code: "",
        name: "",
      },
      orderBy: [],
      pageIndex: 0,
      pageSize: 10,
      showTotal: true,
      listFilter: [],
    };
    findAll(filter)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
          return;
        }
        setData(res.data.result.data);
      })
      .catch((e) => {
        if (e) {
          createNotification(true, e.response.data.message, "error");
          return;
        }
      });
  }, [table === "user" ? table : ""]);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "240px",
            justifyContent: "space-between",
            width: "calc(100vw - 240px)",
            marginTop: "20px",
          }}>
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "black",
              borderBottom: "3px solid black",
              display: "inline-block",
              paddingBottom: "8px",
              marginLeft: "16px",
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
              marginRight: "16px",
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
