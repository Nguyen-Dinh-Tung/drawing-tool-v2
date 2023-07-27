import axios from "axios";
import jwtDecode from "jwt-decode";

export const artHome = async (data) => {
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST + "/api/v1.0/LDP/art/search-and-pagging",
    data
  );
};

export const artComments = async (data, id) => {
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST +
      "/api/v1.0/LDP/comment/parrent-comment-by-art?artId=" +
      id,
    data
  );
};

export const sendComment = async (data) => {
  const accessToken = window.localStorage.getItem("accessToken");
  const userId = jwtDecode(accessToken)["sid"];
  data.userId = userId;
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST + "/api/v1.0/LDP/comment/add-comment",
    data
  );
};
export const rateArt = async (data) => {
  const accessToken = window.localStorage.getItem("accessToken");
  const userId = jwtDecode(accessToken)["sid"];
  data.userId = userId;
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST + "/api/v1.0/LDP/rating/add-or-update",
    data
  );
};

export const reportArt = async (data) => {
  const accessToken = window.localStorage.getItem("accessToken");
  const userId = jwtDecode(accessToken)["sid"];
  data.userId = userId;
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST + "/api/v1.0/LDP/report/add",
    data
  );
};
