const UserRoles = {
  AUTHENTICATED: "Authenticated",
  JOB_PROVIDER: "Job Provider",
  JOB_SEEKER: "Job Seeker",
  PUBLIC: "Public",
  // JOB_PROVIDER: process.env.NEXT_PUBLIC_JOB_PROVIDER_ROLE_ID
  //   ? parseInt(process.env.NEXT_PUBLIC_JOB_PROVIDER_ROLE_ID, 10)
  //   : undefined,
  // JOB_SEEKER: process.env.NEXT_PUBLIC_JOB_SEEKER_ROLE_ID
  //   ? parseInt(process.env.NEXT_PUBLIC_JOB_SEEKER_ROLE_ID, 10)
  //   : undefined,
};

export default UserRoles;
