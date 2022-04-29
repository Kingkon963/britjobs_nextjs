const UserRoles = {
  AUTHENTICATED: process.env.NEXT_PUBLIC_AUTHENTICATED_ROLE_ID
    ? parseInt(process.env.NEXT_PUBLIC_AUTHENTICATED_ROLE_ID, 10)
    : undefined,
  JOB_PROVIDER: process.env.NEXT_PUBLIC_JOB_PROVIDER_ROLE_ID
    ? parseInt(process.env.NEXT_PUBLIC_JOB_PROVIDER_ROLE_ID, 10)
    : undefined,
  JOB_SEEKER: process.env.NEXT_PUBLIC_JOB_SEEKER_ROLE_ID
    ? parseInt(process.env.NEXT_PUBLIC_JOB_SEEKER_ROLE_ID, 10)
    : undefined,
};

export default UserRoles;
