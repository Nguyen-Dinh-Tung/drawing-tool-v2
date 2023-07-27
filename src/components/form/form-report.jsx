import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SelectSison from "../select/Select";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reportArt } from "../../api/art.api";
import { useNotification } from "../../helper/notification";
import { hiddenModal, setModal } from "../../redux/slice/modal.slice";

const useStyles = makeStyles((theme) => ({
  boxContent: {
    width: "500px",
    border: "1px solid #ccc",
    margin: "auto",
  },
  header: { marginBottom: "16px", textAlign: "center" },
  headerText: {
    color: "white",
  },
  title: {
    height: "68px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#34de95",
  },
  img: {
    height: "200px",
    width: "100%",
  },
  inforItem: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px",
  },
  selectSison: {
    display: "flex",
    justifyContent: "center",
  },
  btnReport: {
    width: "200px",
  },
  boxBtn: {
    display: "flex",
    justifyContent: "center",
    margin: "40px ",
  },
  textColor: {
    color: "white",
  },
  tableControler: {
    maxHeight: 440,
    margin: "20px 0",
  },
  reason: {
    m: 1,
    minWidth: "360px",
    minHeight: "50px",
  },
}));
export default function FormReport(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [reason, setReason] = useState({
    illegalType: "",
    text: "",
  });
  const [createNotification] = useNotification();
  const art = useSelector((state) => state.target.user);

  const handleChangeReason = (e) => {
    setReason({ ...reason, [e.target.name]: e.target.value });
  };
  const clickReport = () => {
    const newReport = {
      artId: art.id,
      ...reason,
    };
    reportArt(newReport)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
          return;
        }
        dispatch(hiddenModal({ open: false, content: "report" }));
        createNotification(true, res.data.message, "success");
        setReason({
          illegalType: "",
          text: "",
        });
        return;
      })
      .catch((e) => {
        if (e) {
          createNotification(true, e.response.data.message, "error");
          return;
        }
      });
  };
  return (
    <Box className={classes.boxContent}>
      <Box className={classes.header}>
        <Box className={classes.title}>
          <Typography className={classes.headerText} variant="h4">
            Art report
          </Typography>
        </Box>
        <img src={art && art.artUrl} alt="Random" className={classes.img} />
      </Box>
      <TableContainer className={classes.tableControler}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{art && art.name}</TableCell>
              <TableCell>{art && art.code}</TableCell>
              <TableCell>{art && art.statusTypeName}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Dislike : {art && art.totalDisLike}</TableCell>
              <TableCell>likes : {art && art.totalLike}</TableCell>
              <TableCell>report : {art && art.reportCount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.selectSison}>
        <SelectSison handleChangeReason={handleChangeReason} reason={reason} />
      </Box>
      <Box className={classes.selectSison}>
        <TextField
          id="outlined-basic"
          label="Write reason"
          name="text"
          onChange={handleChangeReason}
          variant="outlined"
          value={reason.text}
          sx={{ m: 1, minWidth: "360px", minHeight: "50px" }}
        />
      </Box>
      <Box className={classes.boxBtn}>
        <Button
          sx={{
            border: "1px solid #34de95",
            color: "#34de95",
          }}
          className={classes.btnReport}
          onClick={clickReport}>
          Report
        </Button>
      </Box>
    </Box>
  );
}
