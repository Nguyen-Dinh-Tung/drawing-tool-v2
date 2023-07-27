import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SelectSison from "../select/Select";
import { useState } from "react";

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
}));
export default function FormReport(props) {
  const classes = useStyles();
  const [reason, setReason] = useState();
  const handleChangeReason = (data) => {
    setReason(data);
  };
  const clickReport = () => {
    const newReport = {
      artId: "",
    };
  };
  return (
    <Box className={classes.boxContent}>
      <Box className={classes.header}>
        <Box className={classes.title}>
          <Typography className={classes.headerText} variant="h4">
            Art report
          </Typography>
        </Box>
        <img
          src={
            "http://194.233.76.213:3488/uploads/images/accounts/8a95036edbe5aae49137808f83ec0f25.png"
          }
          alt="Random"
          className={classes.img}
        />
      </Box>
      <TableContainer className={classes.tableControler}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell>Art Name</TableCell>
              <TableCell>Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Fack contorl</TableCell>
              <TableCell>Girl</TableCell>
              <TableCell>120</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.selectSison}>
        <SelectSison handleChangeReason={handleChangeReason} />
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
