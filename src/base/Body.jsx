import React from "react";
import Modal from "../components/modal/Modal";
import { Outlet } from "react-router";
const Body = (props) => {
  return (
    <div className="body">
      <Outlet />
      <Modal />
    </div>
  );
};

export default Body;
