import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Paint from "./pages/paint/Paint";
import Art from "./pages/art/Art";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { setLogin, setLogout } from "./redux/slice/auth.slice";
import Test from "./pages/test/Test";
import ReportTable from "./components/table/ReportTable";
import Tables from "./components/table/Tables";
import CommentTable from "./components/table/CommentTable";
import RateTable from "./components/table/RateTable";
import ErrorPage from "./pages/error/ErrorPage";
import LoginAdmin from "./pages/login/LoginAdmin";
import TableWithPermissions from "./components/permission/Permission";
import Loading from "./components/loading/loading";

function App() {
  const token = window.localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  useEffect(() => {
    token ? dispatch(setLogin()) : dispatch(setLogout());
  }, []);
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/paint" element={<Paint />} />
            <Route path="/art" element={<Art />} />
            {isLogin ? <Route path="/profile" element={<Profile />} /> : ""}
          </Route>
          <Route path="/admin" element={<Dashboard />}>
            <Route path="/admin/user" element={<Tables />} />
            <Route path="/admin/report" element={<ReportTable />} />
            <Route path="/admin/comments" element={<CommentTable />} />
            <Route path="/admin/rate" element={<RateTable />} />
            <Route
              path="/admin/permission/:id"
              element={<TableWithPermissions />}
            />
          </Route>
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/test" element={<Test />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
