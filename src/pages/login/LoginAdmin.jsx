// LoginPage.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { loginApi } from "../../api/auth.api";
import { useNotification } from "../../helper/notification";
import Loading from "../../components/loading/loading";
import Notification from "../../components/notification/Notification";
import { useNavigate } from "react-router";
const backgroundImage = "/backgounrdlogin.jpg";
const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createNotification] = useNotification();
  const navigate = useNavigate();
  const token = window.localStorage.getItem("adminToken");
  useEffect(() => {
    if (token) navigate("/admin/user");
  }, []);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    const newInfo = {
      email: email,
      password: password,
      applicationType: 1,
    };
    loginApi(newInfo)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
          return;
        }
        window.localStorage.setItem("adminToken", res.data.result.accessToken);
        setEmail("");
        setPassword("");
        navigate("/admin/user");
      })
      .catch((e) => {
        if (e.response)
          createNotification(true, e.response.data.message, "error");
      });
  };
  if (!token)
    return (
      <Container
        maxWidth="xl"
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          py: 10,
        }}>
        <Box
          sx={{
            width: "600px",
            padding: "20px",
            position: "absolute",
            left: "50%",
            transform: "translate(-50% , 50%)",
          }}>
          <Typography variant="h4" color={"#34de95"} gutterBottom>
            Login Cms
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                style={{ background: "#ffffff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                style={{ background: "#ffffff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#34de95",
                  color: "white",
                  height: "40px",
                }}
                onClick={handleSubmit}
                fullWidth>
                Accept
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Notification />
        <Loading />
      </Container>
    );
};

export default LoginAdmin;
