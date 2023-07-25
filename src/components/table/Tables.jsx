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
  const [header, setHeader] = useState([]);
  const [fixedColumns, setFixedColumns] = useState([]);
  const [scrollColumns, setScrollColumns] = useState([]);
  const [reRender, setRerender] = useState("");
  const getDate = (data) => {
    return new Date(data).toLocaleDateString();
  };
  const clickEdit = (row) => {
    console.log(row);
  };
  useEffect(() => {
    const checkHeader = [];
    Object.keys(data[0]).map((e) => {
      if (!disableKey.includes(e)) checkHeader.push(e);
      return;
    });

    setHeader(checkHeader);
    setFixedColumns(checkHeader.slice(0, 2));
    setScrollColumns(checkHeader.slice(2));
  }, [data]);

  console.log(header, "header");
  const handleReRender = () => {};
  useEffect(() => {}, [reRender]);

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
              <TableRow>
                {header.map((columnName, index) => {
                  if (fixedColumns.includes(columnName)) {
                    return (
                      <TableCell key={index} sx={{ textAlign: "left" }}>
                        {columnName}
                      </TableCell>
                    );
                  }
                  if (scrollColumns.includes(columnName)) {
                    return (
                      <TableCell
                        key={index}
                        sx={{
                          minWidth: "150px",
                          textAlign: "left",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                        {columnName}
                      </TableCell>
                    );
                  }
                  return null;
                })}
                <TableCell>Avatar</TableCell>
                <TableCell>Setting</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length &&
                data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
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
                      <IconButton onClick={() => clickEdit(row)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
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
