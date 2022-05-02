import CompleteProfileFormData from "types/CompleteProfileFormData";
import axiosClient from "./axiosClient";

const updateContactDetailsUser = async ({ id, userId }: { id: number; userId: number }) => {
  const client = await axiosClient();
  return client.put(`/contact-details/${id}`, {
    data: {
      user: userId,
    },
  });
};

export default updateContactDetailsUser;
