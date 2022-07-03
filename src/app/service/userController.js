import axios from "axios";
import { CREATE_USER_END_POINT, URL_API } from "../constants/apiLink";
const createUser = async (body) => {
  const config = {
    method: "post",
    url: URL_API + CREATE_USER_END_POINT,
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  };

  return await axios(config);
};

export { createUser };
