const getUserFromStrapi = async (provider: string, access_token: string) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/${provider}/callback`);
  url.searchParams.set("access_token", access_token as string);
  console.log("url", url.toString());
  const response = await fetch(url.toString());
  const data = await response.json();

  return data;
};

export default getUserFromStrapi;
