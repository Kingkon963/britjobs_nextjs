import CompleteProfileFormData from "types/CompleteProfileFormData";
import axiosClient from "./axiosClient";

const createContactDetails = async (data: CompleteProfileFormData) => {
  const client = await axiosClient();
  return client.post("/contact-details", {
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: new Date(data.dateOfBirth).toISOString(),
      gender: data.gender,
      address: {
        postcode: data.postcode,
        addressLine: data.addressLine,
        city: data.city,
      },
    },
  });
};

export default createContactDetails;
