import axios from "axios";

export const registerApi = async (data) => {
  let response;
  await axios
    .post(
      process.env.REACT_APP_BACKEND_HOST + "/api/v1.0/AuthCMS/register",
      data
    )
    .then((res) => (response = res))
    .catch((e) => (response = e));
  return response;
};
export const loginApi = async (data) => {
  let response;
  await axios
    .post(
      process.env.REACT_APP_BACKEND_HOST + "/api/v1.0/AuthCMS/login-ldp",
      data
    )
    .then((res) => (response = res))
    .catch((e) => (response = e));
  return response;
};
