import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Pool } from "pg";
import type { Adapter, AdapterUser } from "next-auth/adapters";
import { NextApiRequest, NextApiResponse } from "next";

interface AdapterOptions {
  provider: string | undefined;
}

const getUserFromStrapi = async (provider: string, access_token: string) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/${provider}/callback`);
  url.searchParams.set("access_token", access_token as string);
  console.log("url", url.toString());
  const response = await fetch(url.toString());
  const data = await response.json();

  return data;
};

const printUsersTable = async (client: Pool) => {
  try {
    const sql = `
      select * from up_users
    `;
    const result = await client.query(sql);
    console.log("users table", result.rows);
  } catch (err) {
    console.log(err);
  }
};

const printUserRolesTable = async (client: Pool) => {
  try {
    const sql = `
      select * from up_roles
    `;
    const result = await client.query(sql);
    console.log("roles table", result.rows);
  } catch (err) {
    console.log(err);
  }
};

const pool = new Pool({
  user: "strapi",
  host: "localhost",
  database: "strapi",
  password: "strapi",
  port: 5432,
});

function PostgresAdapter(client: Pool, options = {} as AdapterOptions): Adapter {
  // console.log("PostgresAdapter", options);
  return {
    async createUser(user) {
      console.log("createUser", user);
      try {
        const sql = `
        INSERT INTO up_users (username, email, provider, image, confirmed)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING username, email`;
        let result = await client.query(sql, [
          user.name,
          user.email,
          options.provider,
          user.image,
          /*user.emailVerified*/ true,
        ]);
        // await printUsersTable(client);
        // await printUserRolesTable(client);
        return result.rows[0];
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async getUser(id) {
      try {
        const sql = `select * from up_users where id = $1`;
        let result = await client.query(sql, [id]);
        return result.rows[0];
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async getUserByEmail(email) {
      try {
        const sql = `select * from up_users where email = $1`;
        let result = await client.query(sql, [email]);
        return result.rows[0];
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      try {
        const sql = `
        select * from up_users
          where
          provider = $1
          and
          provider_account_id = $2`;
        const result = await client.query(sql, [provider, providerAccountId]);
        //console.log("getUserByAccount", providerAccountId, provider, result.rows);
        return result.rows[0];
      } catch (err) {
        console.log(err);
      }
    },
    async updateUser(user) {
      console.log("updateUser", user);
      try {
        const sql = `
        UPDATE up_users
        SET
          email = $1,
          username = $2,
          confirmed = $3
        WHERE id = $4
        RETURNING id, email, username, confirmed`;
        let result = await client.query(sql, [user.email, user.name, user.emailVerified, user.id]);
        return result.rows[0];
      } catch (err) {
        console.log(err);
        return user;
      }
    },
    async linkAccount(account) {
      //console.log("linkAccount", account);
      try {
        if (account.access_token) {
          const data = await getUserFromStrapi(account.provider, account.access_token);

          const sql = `
          UPDATE up_users
          SET
            provider = $1,
            provider_account_id = $2
          WHERE id = $3
          RETURNING *`;
          let result = await client.query(sql, [
            account.provider,
            account.providerAccountId,
            data.user.id,
          ]);
          return result.rows[0];
        }
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async createSession({ sessionToken, userId, expires }) {
      // try {
      //   const sql = `insert into sessions (user_id, expires, session_token) values ($1, $2, $3)`;
      //   await client.query(sql, [userId, expires, sessionToken]);
      //   return { sessionToken, userId, expires };
      // } catch (err) {
      //   console.log(err);
      //   return;
      // }
    },
    async getSessionAndUser(sessionToken: any) {
      // try {
      //   let result;
      //   result = await client.query("select * from sessions where session_token = $1", [
      //     sessionToken,
      //   ]);
      //   let session = result.rows[0];
      //   result = await client.query("select * from users where id = $1", [session.user_id]);
      //   let user = result.rows[0];
      //   return {
      //     session,
      //     user,
      //   };
      // } catch (err) {
      //   console.log(err);
      //   return;
      // }
    },
    async updateSession({ sessionToken }) {
      console.log("updateSession", sessionToken);
      return;
    },
    async deleteSession(sessionToken: any) {
      // try {
      //   const sql = `delete from sessions where session_token = $1`;
      //   await client.query(sql, [sessionToken]);
      // } catch (err) {
      //   console.log(err);
      //   return;
      // }
    },
  };
}

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
    //database: process.env.NEXT_PUBLIC_DATABASE_URL,
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PostgresAdapter(pool, {
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
          console.log(data);
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
