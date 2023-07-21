import React, { lazy, useState } from "react";
import Header from "../../base/Header";
import "../../index.css";
import Notification from "../../components/notification/Notification";
import Loading from "../../components/loading/loading";
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
      <Notification />
      <Loading />
    </div>
  );
}

export default Home;
