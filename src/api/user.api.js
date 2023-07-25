import axios from "axios";

export const findAll = async (data) => {
  return await axios.post(
    process.env.REACT_APP_BACKEND_HOST +
      "/api/v1.0/CMS/user/search-and-pagging",
    data
  );
};
