import axios from "axios";
import { getSession } from "next-auth/react";

const axiosClient = async () => {
  const session = await getSession();

  console.log(session);

  return axios.create({
    baseURL: "http://localhost:1337/api/",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${session?.jwt ? session.jwt : ""}`,
    },
  });
};

export default axiosClient;
