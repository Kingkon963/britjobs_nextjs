import axiosClient from "./axiosClient";

const getContactDetails = async () => {
  const client = await axiosClient();
  return client.get("/contact-details");
};

export default getContactDetails;
