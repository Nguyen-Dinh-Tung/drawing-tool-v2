import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Paint from "./pages/paint/Paint";
import Art from "./pages/art/Art";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/paint" element={<Paint />} />
          <Route path="/art" element={<Art />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
