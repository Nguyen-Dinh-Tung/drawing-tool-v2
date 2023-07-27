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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useNotification } from "../../helper/notification";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/slice/loading.slice";
import { editUserApi } from "../../api/user.api";
import { makeStyles } from "@mui/styles";
const styless = makeStyles((theme) => ({
  textField: {
    "& .MuiInputBase-root": {
      border: "1px solid #34de95",
      borderRadius: "4px",
      "&:hover": {
        borderColor: "#34de95",
      },
      "&.Mui-focused": {
        borderColor: "#34de95",
      },
    },
  },
}));
const defaultTheme = createTheme();

export default function FormEdit(props) {
  const classes = styless();
  const [createNotification] = useNotification();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [fileRender, setFileRender] = React.useState();
  const targetUser = useSelector((state) => state.target.user);
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
    const data = new FormData();
    if (!user.password) user.password = targetUser.password;
    Object.keys(user).map((e) => {
      data.append(e, user[e]);
    });
    editUserApi(data)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
          return;
        }
        createNotification(true, res.data.message, "success");
      })
      .catch((e) => {
        if (e) {
          console.log(e);
          createNotification(true, e.response.data.message, "error");
          return;
        }
      });
    dispatch(hideLoading());
    if (formRef.current) formRef.current.reset();
  };
  React.useEffect(() => {
    console.log(targetUser, "target");
    setUser({
      address: targetUser.address,
      birthDay: targetUser.birthDay,
      code: targetUser.code,
      email: targetUser.email,
      gender: targetUser.gender,
      name: targetUser.name,
      nickname: targetUser.nickname,
      phoneNumber: targetUser.phoneNumber,
      avatar: "",
      id: targetUser.id,
    });
    setFileRender(targetUser.avatar);
  }, [targetUser]);
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
            sx={{ m: 1, bgcolor: "#34de95" }}
            src={
              fileRender ? fileRender : targetUser ? targetUser.avatarUrl : ""
            }>
            {!fileRender ? <LockOutlinedIcon /> : ""}
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit user
          </Typography>
          <Box
            component="form"
            ref={formRef}
            onSubmit={(e) => {
              dispatch(showLoading());
              handleSubmit(e);
            }}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.textField}
                  autoComplete="nickname"
                  name="nickname"
                  fullWidth
                  id="nickname"
                  label="Nickname"
                  onChange={handleChange}
                  value={user.nickname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.textField}
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
                  className={classes.textField}
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
                  className={classes.textField}
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
                  className={classes.textField}
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
                  className={classes.textField}
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
                  className={classes.textField}
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
                  />
                  <PhotoCamera sx={{ fontSize: "40px", color: "#34de95" }} />
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
                      checked={user.gender == 0}
                      control={
                        <Radio
                          sx={{
                            color: "#34de95",
                            "&.Mui-checked": {
                              color: "#34de95",
                            },
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Male"
                      checked={user.gender == 1}
                      control={
                        <Radio
                          sx={{
                            color: "#34de95",
                            "&.Mui-checked": {
                              color: "#34de95",
                            },
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="Other"
                      checked={user.gender == 2}
                      control={
                        <Radio
                          sx={{
                            color: "#34de95",
                            "&.Mui-checked": {
                              color: "#34de95",
                            },
                          }}
                        />
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                border: "1px solid #34de95",
                color: "#34de95",
              }}>
              Accept
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
