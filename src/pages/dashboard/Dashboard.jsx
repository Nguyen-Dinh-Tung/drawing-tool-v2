import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Pagination,
  PaginationItem,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Tables from "../../components/table/Tables";
import { useSelector } from "react-redux";
import Sidebar from "../../components/side-bar/Silde-bar";
import SearchIcon from "@mui/icons-material/Search";
import TableWithPermissions from "../../components/permission/Permission";
import { useNotification } from "../../helper/notification";
import { findAll } from "../../api/user.api";
import Modal from "../../components/modal/Modal";
import Notification from "../../components/notification/Notification";
import Loading from "../../components/loading/loading";

const defaultTable = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    height: "159",
    weight: "159",
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
          if (e.response)
            createNotification(true, e.response.data.message, "error");
          return;
        }
      });
  }, [table === "user" ? table : ""]);
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "rgb(238,174,202)",
        background:
          "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}>
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
            marginBottom: "20px",
          }}>
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "white",
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
              backgroundColor: "#ffffff",
              borderRadius: "6px",
              overflow: "hidden",
            }}
            placeholder="Search"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "#34de95", fontWeight: "700" }} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl
            sx={{
              m: 1,
              minWidth: "250px",
              minHeight: "50px",
              backgroundColor: "#fff",
              borderRadius: "6px",
            }}>
            <InputLabel>Order by</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Order by"
              sx={{
                "& .MuiSelect-icon": {
                  color: "#34de95",
                },
                "& .MuiSelect-iconOpen": {
                  transform: "rotate(180deg)",
                },
              }}>
              <MenuItem>test form</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {table == "permission" ? (
          <TableWithPermissions />
        ) : (
          <Tables data={data && data} />
        )}
      </Box>
      {table === "permission" ? (
        ""
      ) : (
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
            renderItem={(item) => {
              return (
                <PaginationItem
                  {...item}
                  sx={{
                    color: "white",
                    backgroundColor: "#34de95",
                    "&.Mui-selected": {
                      backgroundColor: "#434d5b",
                      color: "white",
                    },
                    "&:hover": {
                      backgroundColor: "gray",
                    },
                  }}
                />
              );
            }}
          />
        </Box>
      )}
      <Modal />
      <Notification />
      <Loading />
    </Box>
  );
};

export default Dashboard;
