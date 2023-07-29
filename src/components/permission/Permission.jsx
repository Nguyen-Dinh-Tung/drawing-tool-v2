import React, { useEffect, useState } from "react";
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
  InputAdornment,
  Typography,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import { useNotification } from "../../helper/notification";
import { useParams } from "react-router";
import { getPermission, updatePermission } from "../../api/user.api";
import ConfirmationPopup from "../confirm/Confirm";

const TableWithPermissions = () => {
  const [mixData, setMixData] = useState([]);
  const [createNotification] = useNotification();
  const [reRender, setReRender] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [opentConfirm, setOpenConfirm] = useState(false);
  const [row, setRow] = useState();
  const { id } = useParams();
  const handleCheck = async () => {
    if (row) {
      const index = mixData.indexOf(row.row);
      mixData[index][row.feature] = row.checked;
      updatePermission(mixData, id)
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
    }
  };
  useEffect(() => {
    getPermission(id)
      .then((res) => {
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

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const openConfirm = (e, row, feature) => {
    setRow({
      checked: e.target.checked,
      row: row,
      feature: feature,
    });
    setOpenConfirm(true);
  };
  const hiddenConfirm = () => {
    setOpenConfirm(false);
  };
  const handleConfirm = () => {
    handleCheck();
    hiddenConfirm();
  };

  const handleCancel = () => {
    setConfirmationOpen(false);
    hiddenConfirm();
  };
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
            <TableRow sx={{ backgroundColor: "#34de95" }}>
              <TableCell sx={{ color: "white", fontWeight: "600" }} key={"all"}>
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
                      openConfirm(e, row, "all");
                    }}>
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      color="primary"
                      name={"isView"}
                      checked={row.isView}
                      sx={{
                        color: "#34de95",
                        "&.Mui-checked": {
                          color: "#34de95",
                        },
                      }}
                      onClick={(e) => {
                        openConfirm(e, row, "isView");
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      color="primary"
                      name={"isDelete"}
                      checked={row.isDelete}
                      sx={{
                        color: "#34de95",
                        "&.Mui-checked": {
                          color: "#34de95",
                        },
                      }}
                      onClick={(e) => {
                        openConfirm(e, row, "isDelete");
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      color="primary"
                      name={"isUpdate"}
                      checked={row.isUpdate}
                      sx={{
                        color: "#34de95",
                        "&.Mui-checked": {
                          color: "#34de95",
                        },
                      }}
                      onClick={(e) => {
                        openConfirm(e, row, "isUpdate");
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationPopup
        open={opentConfirm}
        message="Are you sure you want to proceed?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default TableWithPermissions;
