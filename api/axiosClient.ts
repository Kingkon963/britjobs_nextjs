import axios from "axios";
import { getSession } from "next-auth/react";

const axiosClient = async (jwt: string | undefined = undefined) => {
  const session = await getSession();

  return axios.create({
    baseURL: "http://localhost:1337/api/",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${session?.jwt ? session.jwt : jwt ? jwt : ""}`,
    },
  });
};

export default axiosClient;
