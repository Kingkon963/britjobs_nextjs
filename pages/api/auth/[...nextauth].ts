import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { NextApiRequest, NextApiResponse } from "next";
import getUserFromStrapi from "@utils/getUserFromStrapi";
import PostgresAdapter from "@utils/postgresAdapter";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  console.log("auth", req.method, req.url, req.query, req.body);
  let provider = undefined;
  if (req.query.nextauth[0] === "callback") {
    provider = req.query.nextauth[1];
  }

  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PostgresAdapter(undefined, {
      provider: provider,
    }),
    session: {
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 7,
    },
    jwt: {
      // The maximum age of the NextAuth.js issued JWT in seconds.
      // Defaults to `session.maxAge`.
      maxAge: 60 * 60 * 24 * 7,
    },
    callbacks: {
      async session({ session, token, user }) {
        session.jwt = token.jwt;
        session.id = token.id;
        session.user = {
          email: token.email,
          name: token.name,
          image: token.picture,
        };
        return session;
      },
      async jwt({ token, account }) {
        //console.log("jwt", account);
        if (account?.access_token) {
          const data = await getUserFromStrapi(account.provider, account.access_token);
          //console.log(data);
          token.jwt = data.jwt;
          token.id = data.user.id;
          token.email = data.user.email;
          token.name = data.user.username;
          token.picture = data.user.image;
        }
        return token;
      },
    },
  });
}
