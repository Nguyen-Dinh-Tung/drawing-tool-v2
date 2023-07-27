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
  const [header, setHeader] = useState([]);
  const [fixedColumns, setFixedColumns] = useState([]);
  const [scrollColumns, setScrollColumns] = useState([]);
  const [reRender, setRerender] = useState("");
  const table = useSelector((state) => state.table.target);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      const checkHeader = [];
      Object.keys(data[0]).map((e) => {
        if (!disableKey.includes(e)) checkHeader.push(e);
        return;
      });

      setHeader(checkHeader);
      setFixedColumns(checkHeader.slice(0, 2));
      setScrollColumns(checkHeader.slice(2));
    }
  }, [data]);

  useEffect(() => {}, [reRender]);
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
  return (
    <Box
      sx={{
        width: "calc(100vw - 240px)",
        marginLeft: "240px",
        overflowX: "auto",
      }}>
      {/* Bọc bảng trong một phần tử div để tạo thanh cuộn ngang */}
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
                  Email
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "600" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "600" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "600" }}>
                  Email
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
              {data &&
                data.length &&
                data.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }} // Thay đổi màu nền khi hover vào hàng
                  >
                    {header.map((columnName, cellIndex) => {
                      if (fixedColumns.includes(columnName)) {
                        return (
                          <TableCell key={cellIndex} sx={{ textAlign: "left" }}>
                            {row[columnName]}
                          </TableCell>
                        );
                      }
                      if (scrollColumns.includes(columnName)) {
                        return (
                          <TableCell
                            key={cellIndex}
                            sx={{
                              minWidth: "150px",
                              textAlign: "left",
                              wordBreak: "break-word",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}>
                            {columnName === "birthDay"
                              ? getDate(row[columnName])
                              : columnName === "gender"
                              ? gender[row[columnName]]
                              : columnName === "status"
                              ? status[row[columnName]]
                              : row[columnName]}
                          </TableCell>
                        );
                      }
                      return null;
                    })}
                    <TableCell>
                      {row.avatarUrl ? (
                        <MuiAvatar
                          src={row.avatarUrl}
                          sx={{ width: 40, height: 40 }}
                        />
                      ) : (
                        <MuiAvatar sx={{ width: 40, height: 40 }}>A</MuiAvatar>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => clickPen(row)}>
                        <EditIcon sx={{ color: "#34de95" }} />
                      </IconButton>
                    </TableCell>
                    {table && table === "user" ? (
                      <TableCell>
                        <IconButton onClick={() => clickSetting(row)}>
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
