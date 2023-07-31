import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Box,
  Avatar as MuiAvatar,
  Typography,
  TextField,
  InputAdornment,
  Pagination,
  PaginationItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/slice/modal.slice";
import { setUserTarget } from "../../redux/slice/target.slice";

import EngineeringIcon from "@mui/icons-material/Engineering";
import { findAll } from "../../api/user.api";
import { useNotification } from "../../helper/notification";
import { useNavigate } from "react-router";
import { hideLoading, showLoading } from "../../redux/slice/loading.slice";

const gender = {
  0: "Female",
  1: "Male",
  2: "Other",
};
const status = {
  0: "Stop",
  1: "Active",
};
const Tables = () => {
  const [reRender, setRerender] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [createNotification] = useNotification();
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    const filter = {
      filter: {
        searchField: "",
        code: "",
        name: "",
      },
      orderBy: [],
      pageIndex: currentPage - 1,
      pageSize: 6,
      showTotal: true,
      listFilter: [],
    };
    findAll(filter)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
          return;
        }
        setUsers(res.data.result.data);
        setTotalPage(Math.ceil(res.data.result.count / 6));
      })
      .catch((e) => {
        if (e) {
          if (e.response)
            createNotification(true, e.response.data.message, "error");
          return;
        }
      });
    dispatch(hideLoading());
  }, [reRender, currentPage, loading]);

  useEffect(() => {
    const fetchUsers = () => {
      const filter = {
        filter: {
          searchField: keyword,
          code: "",
          name: "",
        },
        orderBy: [],
        pageIndex: currentPage - 1,
        pageSize: 6,
        showTotal: true,
        listFilter: [],
      };

      findAll(filter)
        .then((res) => {
          if (res.data.isError) {
            createNotification(true, res.data.message, "error");
            return;
          }
          setUsers(res.data.result.data);
          setTotalPage(Math.ceil(res.data.result.count / 6));
        })
        .catch((e) => {
          if (e.response)
            createNotification(true, e.response.data.message, "error");
        });
    };

    clearTimeout(timer);

    setTimer(
      setTimeout(() => {
        fetchUsers();
      }, 1000)
    );
    dispatch(hideLoading());

    return () => clearTimeout(timer);
  }, [keyword, currentPage]);
  const handleReRender = () => {};

  const getDate = (value) => {
    return new Date(value).toLocaleDateString();
  };
  const clickPen = (row) => {
    dispatch(setModal({ open: true, content: "edit" }));
    dispatch(setUserTarget(row));
  };
  const clickSetting = (row) => {
    navigate("/admin/permission/" + row.role);
  };
  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  useEffect(() => {}, []);
  return (
    <Box
      sx={{
        maxwidth: "calc(100vw - 240px)",
        width: "100%",
        overflowX: "auto",
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
          Users dashboard
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
          value={keyword}
          onChange={handleChangeKeyword}
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
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#34de95",
              }}>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Full name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Code
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Birth Day
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                phoneNumber
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Gender
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Nick name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Avatar
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Setting
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Role
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}>
                  <TableCell>{users && user.name}</TableCell>
                  <TableCell>{users && user.code}</TableCell>
                  <TableCell>{users && getDate(user.birthDay)}</TableCell>
                  <TableCell>{users && user.phoneNumber}</TableCell>
                  <TableCell>{users && user.email}</TableCell>
                  <TableCell>{users && gender[user.gender]}</TableCell>
                  <TableCell>{users && user.nickname}</TableCell>
                  <TableCell>
                    {user.avatarUrl ? (
                      <MuiAvatar
                        src={user.avatarUrl}
                        sx={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <MuiAvatar sx={{ width: 40, height: 40 }}>A</MuiAvatar>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => clickPen(user)}>
                      <EditIcon sx={{ color: "#34de95" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {user && user.applicationType === 0 ? (
                      <IconButton
                        onClick={() => {
                          dispatch(showLoading());
                          clickSetting(user);
                        }}>
                        <EngineeringIcon sx={{ color: "#34de95" }} />
                      </IconButton>
                    ) : (
                      "End user"
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          position: "absolute",
          bottom: "4%",
          left: "50%",
        }}>
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={(e, newPage) => {
            handleChangePage(newPage);
          }}
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
    </Box>
  );
};

export default Tables;
