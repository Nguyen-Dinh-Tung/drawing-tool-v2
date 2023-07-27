import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import React, { useState } from "react";
const IllegalType = {
  Choose: 0,
  BreachWithReligion: 1,
  BreachWithRace: 2,
  BreachWithNation: 3,
  BreachWithChild: 4,
  BreachWithSexual: 5,
  BreachWithWar: 6,
  BreachWithIndividualOrGroup: 7,
  Other: 8,
};

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

function SelectSison(props) {
  const [select, setSelect] = useState(IllegalType[0]);
  const handleChange = (e) => {
    setSelect(e.target.value);
    props.handleChangeReason(e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: "360px", minHeight: "50px" }}>
      <InputLabel>Reason</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        onChange={handleChange}
        value={select}
        label="Illegal Type">
        {Object.keys(IllegalType).map((key) => {
          if (IllegalType[key] !== 0)
            return (
              <MenuItem value={IllegalType[key]} key={key}>
                {descriptions[IllegalType[key]]}
              </MenuItem>
            );
        })}
      </Select>
    </FormControl>
  );
}

export default SelectSison;
