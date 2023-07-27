import axios from "axios";
import jwtDecode from "jwt-decode";

export const registerApi = async (data) => {
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST + "/api/v1.0/Auth/register",
    data
  );
};
export const loginApi = async (data) => {
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST + "/api/v1.0/Auth/login",
    data
  );
};

export const getMeApi = async (data) => {
  const accessToken = window.localStorage.getItem("accessToken");
  const userId = jwtDecode(accessToken)["sid"];
  // {userId :
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST +
      "/api/v1.0/Auth/userProfile/user-profile-ldp?userId=" +
      userId,
    data
  );
};
