import React from "react";
import Modal from "../components/modal/Modal";
import { Outlet } from "react-router";
import Select from "../components/select/Select";
const Body = (props) => {
  return (
    <div className="body">
      <Outlet />
      <Modal />
    </div>
  );
};

export default Body;
