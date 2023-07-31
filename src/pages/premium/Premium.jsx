import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Maincard from "../../components/main-card/Maincard";
const style = makeStyles((theme) => ({
  container: {
    marginTop: "120px",
  },
  disalog: {},
}));
function Premium(props) {
  const classes = style();
  return (
    <Container maxWidth={"lg"} className={classes.container}>
      <Grid container spacing={2} columnSpacing={8} classes={classes.gridItem}>
        <Grid item xs={4}>
          <Maincard title={"Free"} content={"50 slot images for free"} />
        </Grid>
        <Grid item xs={4}>
          <Maincard title={"Pro"} content={"100 slot images for pro"} />
        </Grid>
        <Grid item xs={4}>
          <Maincard title={"Ultra"} content={"150 slot images for pro"} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Premium;
