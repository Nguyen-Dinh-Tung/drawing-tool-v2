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
export const getComments = async (data) => {
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST +
      "/api/v1.0/CMS/comment/search-and-pagging",
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
export const rateArtCms = async (data) => {
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST +
      "/api/v1.0/CMS/rating/search-and-pagging",
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

export const getReports = async (data) => {
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST +
      "/api/v1.0/CMS/report/search-and-paging",
    data
  );
};

export const createArt = async (data) => {
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST + "/api/v1.0/LDP/art/upload",
    data
  );
};

export const deleteComment = async (id) => {
  try {
    let resp;
    await axios
      .delete(
        process.env.REACT_APP_BACKEND_HOST +
          "/api/v1.0/CMS/comment/delete-comment?id=" +
          id
      )
      .then((res) => (resp = res));
    return resp;
  } catch (e) {
    return e;
  }
};

export const deleteReport = async (id) => {
  try {
    let resp;
    await axios
      .delete(
        process.env.REACT_APP_BACKEND_HOST +
          "/api/v1.0/CMS/comment/delete-comment?id=" +
          id
      )
      .then((res) => (resp = res));
    return resp;
  } catch (e) {
    return e;
  }
};

export const updateReport = async (data) => {
  try {
    let resp;
    await axios
      .post(
        process.env.REACT_APP_BACKEND_HOST + "/api/v1.0/CMS/report/update",
        data
      )
      .then((res) => (resp = res));
    return resp;
  } catch (e) {
    return e;
  }
};

export const deleteArt = async (id) => {
  try {
    let resp;
    await axios
      .delete(
        process.env.REACT_APP_BACKEND_HOST + "/api/v1.0/CMS/art/delete?id=" + id
      )
      .then((res) => (resp = res));
    return resp;
  } catch (e) {
    return e;
  }
};
