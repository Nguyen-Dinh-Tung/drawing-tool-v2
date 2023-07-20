import React from "react";
import Navbar from "../components/navbar/navbar";

function Header(props) {
  return (
    <div>
      <Navbar
        handleShowModal={props.handleShowModal}
        handleSetContentModal={props.handleSetContentModal}
      />
    </div>
  );
}

export default Header;
