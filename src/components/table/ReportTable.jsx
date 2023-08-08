import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar as MuiAvatar,
  Typography,
  TextField,
  InputAdornment,
  Pagination,
  PaginationItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import React, { useEffect, useState } from "react";
import { getReports, updateReport } from "../../api/art.api";
import { useNotification } from "../../helper/notification";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ConfirmationPopup from "../confirm/Confirm";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { hideLoading } from "../../redux/slice/loading.slice";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { setModal } from "../../redux/slice/modal.slice";
import { setUserTarget } from "../../redux/slice/target.slice";

const descriptions = {
  0: "[---Chọn---]",
  1: "Tranh/Ảnh có tính nhạy cảm về vấn đề tôn giáo",
  2: "Tranh/Ảnh có tính nhạy cảm về vấn đề chủng tộc",
  3: "Tranh/Ảnh có tính nhạy cảm về vấn đề quốc gia",
  4: "Tranh/Ảnh có tính nhạy cảm về vấn đề trẻ em",
  5: "Tranh/Ảnh có tính nhạy cảm về vấn đề tình dục",
  6: "Tranh/Ảnh có tính nhạy cảm về chiến tranh",
  7: "Tranh/Ảnh có tính xúc phạm 1 cá nhân hoặc tập thể",
  8: "Khác",
};
const select = {
  0: "Select",
  1: "Active",
  2: "NonActive",
};
function ReportTable() {
  const [reports, setReports] = useState([]);
  const [createNotification] = useNotification();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [timer, setTimer] = useState(null);
  const [reRender, setReRender] = useState("");
  const loading = useSelector((state) => state.loading);
  const render = useSelector((state) => state.loading);
  const dispatch = useDispatch();
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
    getReports(filter)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
          return;
        }
        setReports(res.data.result.data);
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
  }, [currentPage, loading, reRender, render]);

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

      getReports(filter)
        .then((res) => {
          if (res.data.isError) {
            createNotification(true, res.data.message, "error");
            return;
          }
          setReports(res.data.result.data);
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

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const openCOnfirm = (report) => {
    dispatch(setModal({ open: true, content: "reportUpdate" }));
    dispatch(setUserTarget(report));
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
          Report dashboard
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#34de95",
              }}>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Report creator
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Reported person
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Reason
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Illegal Type
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Art name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Status type
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Art image
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Accept
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Lock
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports &&
              reports.map((e) => (
                <TableRow
                  sx={{
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}>
                  <TableCell>{e.nickname}</TableCell>
                  <TableCell>{e.userName}</TableCell>
                  <TableCell>{e.text}</TableCell>
                  <TableCell>{descriptions[e.illegalType]}</TableCell>
                  <TableCell>{e.artName}</TableCell>
                  <TableCell>{select[e.statusType]}</TableCell>
                  <TableCell>
                    <MuiAvatar src={e.artUrl} sx={{ width: 40, height: 40 }} />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => {}}>
                      <CheckCircleOutlineIcon sx={{ color: "#34de95" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <EditIcon
                        sx={{ color: "#34de95", cursor: "pointer" }}
                        onClick={() => {
                          openCOnfirm(e);
                        }}
                      />
                    </IconButton>
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
}

export default ReportTable;
