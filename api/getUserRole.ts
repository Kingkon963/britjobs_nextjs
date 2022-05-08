import axiosClient from "./axiosClient";

const getUserRole = async () => {
  const client = await axiosClient();
  return client.get("/utils/get-user-role");
};

export default getUserRole;
