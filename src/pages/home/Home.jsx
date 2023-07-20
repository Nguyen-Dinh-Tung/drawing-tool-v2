import React, { lazy, useState } from "react";
import Header from "../../base/Header";
import "../../index.css";
const BodyLazy = lazy(() => import("../../base/Body"));

function Home(props) {
  const [showModal, setShowModal] = useState();
  const [contentModal, setContentModal] = useState();
  const handleShowModal = (status) => {
    setShowModal(status);
  };
  const handleSetContentModal = (data) => {
    setContentModal(data);
  };
  return (
    <div className="app">
      <Header
        handleShowModal={handleShowModal}
        handleSetContentModal={handleSetContentModal}
      />
      <BodyLazy
        showModal={showModal}
        handleShowModal={handleShowModal}
        contentModal={contentModal}
        fallback
      />
    </div>
  );
}

export default Home;
