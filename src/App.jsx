import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Paint from "./pages/paint/Paint";
import Art from "./pages/art/Art";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLogin, setLogout } from "./redux/slice/auth.slice";

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
          {token ? <Route path="/profile" element={<Profile />} /> : ""}
        </Route>
        <Route path="/admin" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
