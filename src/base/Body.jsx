import React from "react";
import Modal from "../components/modal/Modal";
import { Outlet } from "react-router";
const Body = (props) => {
  return (
    <div className="body">
      <Outlet />
      <Modal
        showModal={props.showModal}
        handleShowModal={props.handleShowModal}
        contentModal={props.contentModal}
      />
    </div>
  );
};

export default Body;
