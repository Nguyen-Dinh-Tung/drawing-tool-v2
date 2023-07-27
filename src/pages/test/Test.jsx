import { Box, Container, Grid } from "@mui/material";
import React from "react";
import SelectSison from "../../components/select/Select";
import FormReport from "../../components/form/form-report";

function Test(props) {
  return (
    <Container disableGutters spacing={0} maxWidth={"100vw"} margin={0}>
      <Grid container width={"100vw"} height={"60px"}></Grid>
      {/* <Grid container sx={{ backgroundColor: "green" }} columns={16}>
        <Grid
          item
          maxHeight={"100vh"}
          height={"100vh"}
          sm={3}
          sx={{ backgroundColor: "green" }}></Grid>
        <Grid
          item
          maxHeight={"100vh"}
          height={"100vh"}
          sm={13}
          sx={{ backgroundColor: "yellow" }}>
          <Grid>Header</Grid>
          <Grid>Body</Grid>
          <Grid>Footer</Grid>
        </Grid>
      </Grid> */}
      <FormReport />
    </Container>
  );
}

export default Test;
