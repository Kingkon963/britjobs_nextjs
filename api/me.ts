import CompleteProfileFormData from "types/CompleteProfileFormData";
import axiosClient from "./axiosClient";

const me = async () => {
  const client = await axiosClient();
  return client.get("/users/me");
};

export default me;
