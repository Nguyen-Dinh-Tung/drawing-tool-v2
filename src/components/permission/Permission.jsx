import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Checkbox,
} from "@mui/material";
import _ from "lodash";
import { useNotification } from "../../helper/notification";
import { useParams } from "react-router";
import { getPermission, updatePermission } from "../../api/user.api";
import { useSelector } from "react-redux";
const managerData = [
  "user",
  "report",
  "comment",
  "rate",
  "package",
  "role",
  "art",
];

const TableWithPermissions = ({ users }) => {
  const [mixData, setMixData] = useState([]);
  const [createNotification] = useNotification();
  const [reRender, setReRender] = useState("");

  const target = useSelector((state) => state.target.user);

  const handleCheck = async (e, row, column) => {
    const checkedStatus = e.target.checked;
    console.log(row, "row");
    console.log(column, "column");
    console.log(checkedStatus, "checkedStatus");
    const index = mixData.indexOf(row);
    if (checkedStatus !== undefined) {
      row[column] = checkedStatus;
    }
    mixData[index] = row;
    updatePermission(mixData, target.role)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
          return;
        }
        createNotification(true, res.data.message, "success");
        setReRender(Date.now());
      })
      .catch((e) => {
        if (e) {
          if (e.response)
            createNotification(true, e.response.data.message, "error");
          return;
        }
      });
  };
  useEffect(() => {
    getPermission(target.role)
      .then((res) => {
        console.log(res, "res");
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
          return;
        }
        const data = res.data.result;
        setMixData(data);
      })
      .catch((e) => {
        if (e) {
          if (e.response)
            createNotification(true, e.response.data.message, "error");
          return;
        }
      });
  }, [reRender]);
  return (
    <Box
      sx={{
        marginLeft: "240px",
        overflowX: "auto",
        width: "calc(100vw - 240px)",
      }}>
      <div style={{ overflowX: "auto" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#34de95" }}>
                <TableCell
                  sx={{ color: "white", fontWeight: "600" }}
                  key={"all"}>
                  All
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "600" }}
                  key={"isView"}>
                  View
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "600" }}
                  key={"isDelete"}>
                  Delete
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "600" }}
                  key={"isUpdate"}>
                  Update
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mixData &&
                mixData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      onClick={(e) => {
                        handleCheck(e, row, "all");
                      }}>
                      {row.name}
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        color="primary"
                        name={row.isView}
                        checked={row.isView}
                        onClick={(e) => {
                          handleCheck(e, row, "isView");
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        color="primary"
                        name={row.isDelete}
                        checked={row.isDelete}
                        onClick={(e) => {
                          handleCheck(e, row, "isDelete");
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        color="primary"
                        name={row.isUpdate}
                        checked={row.isUpdate}
                        onClick={(e) => {
                          handleCheck(e, row, "isUpdate");
                        }}
                      />
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

export default TableWithPermissions;
