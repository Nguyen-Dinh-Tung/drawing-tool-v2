import React, { lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../base/Header";
import "../../index.css";
import Notification from "../../components/notification/Notification";
import Loading from "../../components/loading/loading";
const BodyLazy = lazy(() => import("../../base/Body"));

function Home(props) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/art");
  }, []);
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
