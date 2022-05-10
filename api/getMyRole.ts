import { QueryFunctionContext } from "react-query";
import axiosClient from "./axiosClient";

const getMyRole = async (jwt = "") => {
  const client = await axiosClient(jwt);
  return client.get("/utils/get-my-role");
};

export default getMyRole;
