import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Maincard from "../../components/main-card/Maincard";
const style = makeStyles((theme) => ({
  container: {},
  disalog: {},
}));
function Test() {
  const classes = style();
  return (
    <Container maxWidth={"lg"} className={classes.container}>
      <Grid container spacing={2} columnSpacing={8} classes={classes.gridItem}>
        <Grid item xs={4}>
          <Maincard />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Test;
