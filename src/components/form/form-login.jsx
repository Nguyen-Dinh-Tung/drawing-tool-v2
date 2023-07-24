import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginApi } from "../../api/auth.api";
import { useNotification } from "../../helper/notification";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/slice/loading.slice";
import { hiddenModal } from "../../redux/slice/modal.slice";
import { setLogin } from "../../redux/slice/auth.slice";
const defaultTheme = createTheme();

export default function FormLogin(props) {
  const [createNotification] = useNotification();
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    applicationType: 2,
  });
  const closeModal = () => {
    dispatch(hiddenModal());
  };
  const handleSubmit = async (event) => {
    dispatch(showLoading());
    event.preventDefault();
    const data = new FormData();
    Object.keys(user).map((e) => {
      return data.append(e, user[e]);
    });
    await loginApi(user)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
          dispatch(hideLoading());
          return;
        }
        const token = res.data.result.accessToken;
        window.localStorage.setItem("accessToken", token);
        createNotification(true, res.data.message, "success");
        closeModal();
        dispatch(setLogin());
      })
      .catch((e) => {
        if (e) createNotification(true, e.response.message, "error");
      });
    dispatch(hideLoading());
  };
  const handleChane = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
          <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
              value={user.email}
              onChange={handleChane}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={user.password}
              autoComplete="current-password"
              onChange={handleChane}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2, border: "1px solid #2b81d5" }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
