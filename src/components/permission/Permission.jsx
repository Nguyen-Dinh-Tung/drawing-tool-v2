import React, { useState } from "react";
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

const columns = [
  { field: "User", header: "User" },
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
  const handleCheck = (e, row, column) => {
    const groupDataByUser = _.groupBy(data, "user");
    if (e.target.checked !== undefined) {
      const newData = data.map((element) => {
        return groupDataByUser[row.user] &&
          groupDataByUser[row.user][0].user === element.user
          ? {
              ...groupDataByUser[row.user][0],
              [column.field]: e.target.checked,
            }
          : element;
      });
      setData(newData);
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
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {column.field === "user" ? (
                      row[column.field]
                    ) : (
                      <Checkbox
                        color="primary"
                        checked={row[column.field]}
                        onClick={(e) => {
                          handleCheck(e, row, column);
                        }}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableWithPermissions;
