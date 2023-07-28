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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getReports } from "../../api/art.api";
import { useNotification } from "../../helper/notification";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
function ReportTable({ currentPage, setTotalPage, totalPage, keyword }) {
  const table = useSelector((state) => state.table.table);
  const [reports, setReports] = useState([]);
  const [createNotification] = useNotification();
  console.log(reports, "report");
  useEffect(() => {
    const filter = {
      filter: {
        searchField: keyword[table],
        code: "",
        name: "",
      },
      orderBy: [],
      pageIndex: currentPage && table && currentPage - 1,
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

        setTotalPage({
          ...totalPage,
          [table]: Math.ceil(res.data.result.count / filter.pageSize),
        });
      })
      .catch((e) => {
        if (e) {
          if (e.response)
            createNotification(true, e.response.data.message, "error");
          return;
        }
      });
  }, []);
  return (
    <Box
      sx={{
        width: "calc(100vw - 240px)",
        marginLeft: "240px",
        overflowX: "auto",
      }}>
      <div style={{ overflowX: "auto" }}>
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
                  Art image
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "600" }}>
                  Accept
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "600" }}>
                  Delete
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
                    <TableCell>
                      <MuiAvatar
                        src={e.artUrl}
                        sx={{ width: 40, height: 40 }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <CheckCircleOutlineIcon sx={{ color: "#34de95" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <DeleteOutlineIcon sx={{ color: "#34de95" }} />
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
}

export default ReportTable;
