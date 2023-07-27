import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/slice/modal.slice";
import { setUserTarget } from "../../redux/slice/target.slice";

import EngineeringIcon from "@mui/icons-material/Engineering";
import { setTitle } from "../../redux/slice/title.slice";
import { setTarget } from "../../redux/slice/table.slice";
import { useNavigate } from "react-router";
import { findAll } from "../../api/user.api";
import { useNotification } from "../../helper/notification";

const disableKey = [
  "id",
  "applicationType",
  "created",
  "filter",
  "avatarUrl",
  "role",
];
const gender = {
  0: "Female",
  1: "Male",
  2: "Other",
};
const status = {
  0: "Stop",
  1: "Active",
};
const Tables = ({ data }) => {
  const [reRender, setRerender] = useState("");
  const [users, setUsers] = useState([]);
  const table = useSelector((state) => state.table.target);
  const dispatch = useDispatch();
  const [createNotification] = useNotification();

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
        setUsers(res.data.result.data);
      })
      .catch((e) => {
        if (e) {
          if (e.response)
            createNotification(true, e.response.data.message, "error");
          return;
        }
      });
  }, [reRender]);
  const handleReRender = () => {};
  const getDate = (value) => {
    return new Date(value).toLocaleDateString();
  };
  const clickPen = (row) => {
    dispatch(setModal({ open: true, content: "edit" }));
    dispatch(setUserTarget(row));
  };
  const clickSetting = (row) => {
    dispatch(setUserTarget(row));
    dispatch(setTitle("Decentralization dashboard"));
    dispatch(setTarget("permission"));
  };
  useEffect(() => {}, []);
  return (
    <Box
      sx={{
        width: "calc(100vw - 240px)",
        marginLeft: "240px",
        overflowX: "auto",
      }}>
      <div style={{ overflowX: "auto" }}>
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
                {table && table === "user" ? (
                  <TableCell sx={{ color: "white", fontWeight: "600" }}>
                    Role
                  </TableCell>
                ) : (
                  ""
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length &&
                users.map((user, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
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
                    {table && table === "user" ? (
                      <TableCell>
                        <IconButton onClick={() => clickSetting(user)}>
                          <EngineeringIcon sx={{ color: "#34de95" }} />
                        </IconButton>
                      </TableCell>
                    ) : (
                      ""
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default Tables;
