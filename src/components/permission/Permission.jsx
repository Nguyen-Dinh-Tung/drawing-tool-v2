import React, { useRef, useState } from "react";
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
const columns = [
  { field: "user", header: "User" },
  { field: "all", header: "All" },
  { field: "First", header: "First" },
  { field: "Second", header: "Second" },
  { field: "Third", header: "Third" },
];

const managerData = [
  { user: "1", all: true, First: true, Second: false, Third: true },
  { user: "2", all: true, First: true, Second: false, Third: true },
  { user: "3", all: true, First: true, Second: false, Third: true },
  { user: "4", all: true, First: true, Second: false, Third: true },
  { user: "5", all: true, First: true, Second: false, Third: true },
];

const TableWithPermissions = () => {
  const [data, setData] = useState(managerData);
  const [createNotification] = useNotification();
  const handleCheck = async (e, row, column) => {
    const index = data.indexOf(row);
    const checkedStatus = e.target.checked;
    if (checkedStatus !== undefined) {
      if (column.field === "all") {
        Object.keys(row).some((key) => {
          if (key !== "user") {
            row[key] = checkedStatus;
          }
        });
      } else {
        checkedStatus
          ? (row[column.field] = checkedStatus)
          : (row[column.field] = checkedStatus);
        if (!checkedStatus) {
          row["all"] = false;
        }
      }
      data[index] = row;
      setData([...data]);
      await setTimeout(() => {
        createNotification(true, "Update permission success", "success");
      }, 2000);
    }
  };
  return (
    <Box sx={{ marginLeft: "240px", overflowX: "scroll" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => {
                  return (
                    <TableCell key={colIndex}>
                      {column.field === "user" ? (
                        <p>{row[column.field]}</p>
                      ) : (
                        <Checkbox
                          color="primary"
                          checked={row[column.field]}
                          name={column.field}
                          onClick={(e) => {
                            handleCheck(e, row, column);
                          }}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableWithPermissions;
