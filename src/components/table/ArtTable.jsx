import {
  Box,
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
import { artHome, getComments } from "../../api/art.api";
import { useNotification } from "../../helper/notification";
import ConfirmationPopup from "../confirm/Confirm";
import { hideLoading } from "../../redux/slice/loading.slice";
import { useDispatch } from "react-redux";
const status = {
  0: "hidden",
  1: "Show",
};
function ArtTable() {
  const [arts, setArts] = useState([]);
  const [createNotification] = useNotification();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [timer, setTimer] = useState(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [opentConfirm, setOpenConfirm] = useState(false);
  const dispatch = useDispatch();
  console.log(arts, "art");
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
    artHome(filter)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
          return;
        }
        setArts(res.data.result.data);
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
  }, [currentPage]);

  useEffect(() => {
    if (!keyword) return;
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

      artHome(filter)
        .then((res) => {
          if (res.data.isError) {
            createNotification(true, res.data.message, "error");
            return;
          }
          setArts(res.data.result.data);
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

  const hiddenConfirm = () => {
    setOpenConfirm(false);
  };
  const handleConfirm = () => {
    setConfirmationOpen(true);
    hiddenConfirm();
  };

  const handleCancel = () => {
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
          Comments dashboard
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
                Art name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Report Count
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Comments
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Like
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Dislike
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Avatar
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Date
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "600" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arts &&
              arts.map((e) => (
                <TableRow
                  sx={{
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.reportCount}</TableCell>
                  <TableCell>{e.totalComment}</TableCell>
                  <TableCell>{e.totalLike}</TableCell>
                  <TableCell>{e.totalDisLike}</TableCell>
                  <TableCell>
                    <MuiAvatar src={e.artUrl} sx={{ width: 40, height: 40 }} />
                  </TableCell>
                  <TableCell>{getDate(e.created)}</TableCell>
                  <TableCell>{status[e.statusType]}</TableCell>
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

export default ArtTable;
