import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, IconButton, Radio, RadioGroup } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { registerApi } from "../../api/auth.api";

import { useNotification } from "../../helper/notification";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function FormRegister() {
  const [createNotification] = useNotification();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await registerApi(data);
    if (res.statusCode !== 200) {
      createNotification(true, "Register error", "error");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="nickname"
                  name="nickname"
                  required
                  fullWidth
                  id="nickname"
                  label="Nickname"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="code"
                  label="Your code"
                  name="code"
                  autoComplete="code"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="BirthDay"
                  label="Date of birth"
                  name="birthDay"
                  autoComplete="birthDay"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="Full name"
                  id="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Your address"
                  id="address"
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label">
                  <input
                    hidden
                    name="avatar"
                    accept="image/*"
                    type="file"
                    required
                  />
                  <PhotoCamera sx={{ fontSize: "40px" }} />
                </IconButton>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender">
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
