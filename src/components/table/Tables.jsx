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

const Tables = ({ data }) => {
  const [header, setHeader] = useState(data.length ? Object.keys(data[0]) : []);
  const [fixedColumns, setFixedColumns] = useState([]);
  const [scrollColumns, setScrollColumns] = useState([]);

  useEffect(() => {
    // Giữ cố định 2 trường đầu tiên
    setFixedColumns(header.slice(0, 2));
    // Trường còn lại cho phép scroll ngang
    setScrollColumns(header.slice(2));
  }, [header]);

  return (
    <Box sx={{ marginLeft: "240px", overflowX: "scroll" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {fixedColumns.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
              {scrollColumns.map((header, index) => (
                <TableCell key={index} sx={{ minWidth: "150px" }}>
                  {header}
                </TableCell>
              ))}
              <TableCell>Avatar</TableCell>
              <TableCell>Setting</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length &&
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {fixedColumns.map((header, cellIndex) => (
                    <TableCell key={cellIndex}>{row[header]}</TableCell>
                  ))}
                  {scrollColumns.map((header, cellIndex) => (
                    <TableCell key={cellIndex} sx={{ minWidth: "150px" }}>
                      {row[header]}
                    </TableCell>
                  ))}
                  <TableCell>
                    {row.avatar ? (
                      <MuiAvatar
                        src={row.avatar} // Chỗ này là URL hoặc base64 của avatar trong dữ liệu
                        sx={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <MuiAvatar sx={{ width: 40, height: 40 }}>A</MuiAvatar>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Tables;
