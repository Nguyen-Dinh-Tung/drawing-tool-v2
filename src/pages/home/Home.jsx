import React, { lazy, useState } from "react";
import Header from "../../base/Header";
import "../../index.css";
import Notification from "../../components/notification/Notification";
import Loading from "../../components/loading/loading";
import Select from "../../components/select/Select";
const BodyLazy = lazy(() => import("../../base/Body"));

function Home(props) {
  return (
    <div className="app">
      <Header />
      <BodyLazy fallback />
      <Notification />
      <Loading />
    </div>
  );
}

export default Home;
