import axios from "axios";
// import { CREATE_USER_END_POINT, URL_API } from "../constants/apiLink";
const createUser = async (params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // const body = JSON.stringify(params);
  const res = await axios.post("/api/users", params, config);
  return res;
};

export { createUser };
