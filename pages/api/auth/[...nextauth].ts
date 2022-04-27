import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { NextApiRequest, NextApiResponse } from "next";
import getUserFromStrapi from "@utils/getUserFromStrapi";
import PostgresAdapter from "@utils/postgresAdapter";

let provider: string | undefined = undefined;
let userRole: number | undefined = undefined;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  console.log("auth", req.method, req.url, req.query, req.body);
  if (req.query.nextauth[0] === "signin") {
    provider = req.query.nextauth[1];
    userRole = req.body.userRole ? parseInt(req.body.userRole, 10) : undefined;
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
      userRole: userRole,
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
        //session.isNewUser = token.isNewUser;
        session.user = {
          ...user,
          email: token.email,
          name: token.name,
          image: token.picture,
          isNewUser: token.isNewUser,
        };
        return session;
      },
      async jwt({ token, account, isNewUser }) {
        if (account?.access_token) {
          const data = await getUserFromStrapi(account.provider, account.access_token);

          token.jwt = data.jwt;
          token.id = data.user.id;
          token.email = data.user.email;
          token.name = data.user.username;
          token.picture = data.user.image;
          token.isNewUser = isNewUser;
        }
        return token;
      },
    },
  });
}
