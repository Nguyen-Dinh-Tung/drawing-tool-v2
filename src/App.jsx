import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import React from "react";

import Dashboard from "./pages/dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { setLogin, setLogout } from "./redux/slice/auth.slice";
import Test from "./pages/test/Test";
import ErrorPage from "./pages/error/ErrorPage";
import LoginAdmin from "./pages/login/LoginAdmin";
import Loading from "./components/loading/loading";

const LazyPaint = React.lazy(() => import("./pages/paint/Paint"));
const LazyArt = React.lazy(() => import("./pages/art/Art"));
const LazyProfile = React.lazy(() => import("./pages/profile/Profile"));
const LazyTables = React.lazy(() => import("./components/table/Tables"));
const LazyReportTable = React.lazy(() =>
  import("./components/table/ReportTable")
);
const LazyRateTable = React.lazy(() => import("./components/table/RateTable"));
const LazyTableWithPermissions = React.lazy(() =>
  import("./components/permission/Permission")
);

function App() {
  const token = window.localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  useEffect(() => {
    token ? dispatch(setLogin()) : dispatch(setLogout());
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/paint" element={<LazyPaint />} />
            <Route path="/art" element={<LazyArt />} />
            {isLogin ? <Route path="/profile" element={<LazyProfile />} /> : ""}
          </Route>
          <Route path="/admin" element={<Dashboard />}>
            <Route path="/admin/user" element={<LazyTables />} />
            <Route path="/admin/report" element={<LazyReportTable />} />
            <Route path="/admin/rate" element={<LazyRateTable />} />
            <Route
              path="/admin/permission/:id"
              element={<LazyTableWithPermissions />}
            />
          </Route>
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
