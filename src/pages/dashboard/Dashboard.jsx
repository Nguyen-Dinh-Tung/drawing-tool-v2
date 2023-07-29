import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar from "../../components/side-bar/Silde-bar";
import Modal from "../../components/modal/Modal";
import Notification from "../../components/notification/Notification";
import Loading from "../../components/loading/loading";
import { Outlet, useNavigate } from "react-router";

const Dashboard = () => {
  const token = window.localStorage.getItem("adminToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, []);
  if (token)
    return (
      <>
        <Box
          sx={{
            boxSizing: "border-box",
            display: "flex",
            height: "100vh",
            background: "rgb(238,174,202)",
            background:
              "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
          }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              width: "100%",
            }}>
            <Outlet />
          </Box>
        </Box>
        <Modal />
        <Notification />
        {/* <Loading /> */}
      </>
    );
};

export default Dashboard;
