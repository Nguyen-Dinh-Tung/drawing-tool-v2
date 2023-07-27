import axios from "axios";

export const findAll = async (data) => {
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST +
      "/api/v1.0/CMS/user/search-and-pagging",
    data
  );
};
export const editUserApi = async (data) => {
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST + "/api/v1.0/CMS/user/add-or-update",
    data
  );
};

export const getPermission = async (data) => {
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST +
      "/api/v1.0/CMS/role/get-all-permission-by-roleid?Id=" +
      data,
    data
  );
};

export const updatePermission = async (data, id) => {
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST +
      "/api/v1.0/CMS/role/add-or-update-permission?roleId=" +
      id,
    data
  );
};
