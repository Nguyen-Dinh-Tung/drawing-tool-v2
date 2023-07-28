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
import { artComments, getComments, getReports } from "../../api/art.api";
import { useNotification } from "../../helper/notification";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmationPopup from "../confirm/Confirm";
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
const status = {
  0: "hidden",
  1: "Show",
};
function CommentTable() {
  const [comments, setComments] = useState([]);
  const [createNotification] = useNotification();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [timer, setTimer] = useState(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [opentConfirm, setOpenConfirm] = useState(false);
  const [currentReport, setCurrentReport] = useState({});
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
    getComments(filter)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
          return;
        }
        setComments(res.data.result.data);
        setTotalPage(Math.ceil(res.data.result.count / 6));
      })
      .catch((e) => {
        if (e) {
          if (e.response)
            createNotification(true, e.response.data.message, "error");
          return;
        }
      });
  }, [currentPage]);

  useEffect(() => {
    // Function to call the API
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

      getComments(filter)
        .then((res) => {
          if (res.data.isError) {
            createNotification(true, res.data.message, "error");
            return;
          }
          setComments(res.data.result.data);
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

    return () => clearTimeout(timer);
  }, [keyword, currentPage]);
  console.log(comments);
  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const openConfirm = (element) => {
    setCurrentReport(element);
    setOpenConfirm(true);
  };
  const hiddenConfirm = () => {
    setOpenConfirm(false);
  };
  const handleConfirm = () => {
    setConfirmationOpen(true);
    hiddenConfirm();
  };

  const handleCancel = () => {
    console.log("cancel");
    setConfirmationOpen(false);
    hiddenConfirm();
  };
  const getDate = (value) => {
    return new Date(value).toLocaleDateString();
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#34de95",
              }}>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Creator
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Art name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Content
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Art name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Art image
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Date
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Status
              </TableCell>
              {/* <TableCell sx={{ color: "white", fontWeight: "600" }}>
                  Delete
                </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {comments &&
              comments.map((e) => (
                <TableRow
                  sx={{
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}>
                  <TableCell>{e.userName}</TableCell>
                  <TableCell>{e.artName}</TableCell>
                  <TableCell>{e.text}</TableCell>
                  <TableCell>
                    <MuiAvatar
                      src={e.userAvatar}
                      sx={{ width: 40, height: 40 }}
                    />
                  </TableCell>
                  <TableCell>
                    <MuiAvatar
                      src={e.userAvatar}
                      sx={{ width: 40, height: 40 }}
                    />
                  </TableCell>
                  <TableCell>{getDate(e.created)}</TableCell>
                  <TableCell>{status[e.statusType]}</TableCell>

                  {/* <TableCell>
                      <IconButton
                        onClick={() => {
                          openConfirm(e);
                        }}>
                        <DeleteOutlineIcon sx={{ color: "#34de95" }} />
                      </IconButton>
                    </TableCell> */}
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
      <ConfirmationPopup
        open={opentConfirm}
        message="Are you sure you want to proceed?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Box>
  );
}

export default CommentTable;
