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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useNotification } from "../../helper/notification";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/slice/loading.slice";

const defaultTheme = createTheme();

export default function FormRegister(props) {
  const [createNotification] = useNotification();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [fileRender, setFileRender] = React.useState();
  const [user, setUser] = React.useState({
    name: "",
    code: "",
    nickname: "",
    email: "",
    birthDay: "",
    gender: "",
    address: "",
    avatar: "",
    phoneNumber: "",
    password: "",
  });
  const dispatch = useDispatch();
  const formRef = React.useRef(null);
  const handleChange = (e) => {
    if (e.target.name !== "avatar")
      setUser({ ...user, [e.target.name]: e.target.value });
    else {
      setUser({ ...user, avatar: e.target.files[0] });
      const objectURL = URL.createObjectURL(e.target.files[0]);
      setFileRender(objectURL);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget.value);
    Object.keys(user).map((e) => {
      data.append(e, user[e]);
    });
    dispatch(showLoading());
    const res = await registerApi(data);
    if (res.statusCode !== 200) {
      createNotification(true, res.data.message, "error");
      dispatch(hideLoading());
      return;
    }
    createNotification(true, res.data.message, "success");
    props.handleShowModal(false);
    formRef.current.reset();
    dispatch(hideLoading());
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
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main" }}
            src={fileRender ? fileRender : ""}>
            {!fileRender ? <LockOutlinedIcon /> : ""}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            ref={formRef}
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
                  onChange={handleChange}
                  value={user.nickname}
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
                  onChange={handleChange}
                  value={user.password}
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
                  onChange={handleChange}
                  value={user.email}
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
                  onChange={handleChange}
                  value={user.code}
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
                  onChange={handleChange}
                  value={user.phoneNumber}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(value) => {
                      setUser({
                        ...user,
                        birthDay: new Date(value).toISOString(),
                      });
                      setSelectedDate(new Date(value).toISOString());
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="Full name"
                  id="name"
                  onChange={handleChange}
                  value={user.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Your address"
                  id="address"
                  onChange={handleChange}
                  value={user.address}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    name="gender">
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value={2}
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
              sx={{ mt: 3, mb: 2, border: "1px solid #2b81d5" }}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
