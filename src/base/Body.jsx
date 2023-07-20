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

const images = [
  "https://cdn.pixabay.com/photo/2016/12/19/21/36/woman-1919143_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/11/29/09/15/paint-2985569_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/02/25/22/06/staircase-274614_640.jpg",
  "https://cdn.pixabay.com/photo/2017/02/04/23/02/candle-2038736_640.jpg",
];
