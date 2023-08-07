import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReport } from "../../api/art.api";
import { useNotification } from "../../helper/notification";
import { hiddenModal } from "../../redux/slice/modal.slice";

function ReportSelect(props) {
  const [value, setValue] = useState(0);
  const [createNotification] = useNotification();
  const target = useSelector((state) => state.target.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (e.target) setValue(e.target.value);
  };
  const clickChange = async () => {
    const infor = {
      id: target.id,
      statusType: value,
    };
    const res = await updateReport(infor);
    if (res.response || res.isError) {
      createNotification(true, res.message, "error");
      return;
    }
    createNotification(true, res.data.message, "success");
    dispatch(hiddenModal());
  };
  return (
    <FormControl sx={{ m: 1, minWidth: "360px", minHeight: "50px" }}>
      <InputLabel>Reason</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        onChange={handleChange}
        name="illegalType"
        value={props.reason && props.reason.illegalType}
        label="Illegal Type">
        <MenuItem value={0}>Select</MenuItem>
        <MenuItem value={1}>Active</MenuItem>
        <MenuItem value={2}>NonActive</MenuItem>
      </Select>
      <Button
        sx={{
          border: "1px solid #34de95",
          color: "#34de95",
          marginTop: "20px",
        }}
        onClick={clickChange}>
        Accept
      </Button>
    </FormControl>
  );
}

export default ReportSelect;
