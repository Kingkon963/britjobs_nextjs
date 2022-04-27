import { Pool } from "pg";
import type { Adapter } from "next-auth/adapters";
import getUserFromStrapi from "./getUserFromStrapi";

interface AdapterOptions {
  provider: string | undefined;
  userRole: number | undefined;
}

const assignUserToRole = async (client: Pool, userId: number, roleId: number) => {
  // console.log("assigning User a role", userId, roleId);
  try {
    const sql = `
    INSERT INTO up_users_role_links (user_id, role_id)
    VALUES ($1, $2)
    RETURNING *`;
    let result = await client.query(sql, [userId, roleId]);
    return result.rows[0];
  } catch (err) {
    console.log(err);
    return;
  }
};

const pool = new Pool({
  user: "strapi",
  host: "localhost",
  database: "strapi",
  password: "strapi",
  port: 5432,
});

function PostgresAdapter(client: Pool = pool, options = {} as AdapterOptions): Adapter {
  return {
    async createUser(user) {
      // console.log("createUser", user);
      console.log("PostgresAdapter", options);

      try {
        const sql = `
        INSERT INTO up_users (username, email, provider, image, confirmed)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`;
        let result = await client.query(sql, [
          `${user.name}-${user.email}`,
          user.email,
          options.provider,
          user.image,
          /*user.emailVerified*/ true,
        ]);

        if (typeof options.userRole === "undefined") {
          throw new Error("PostgresAdapter requires a userRole");
        }
        await assignUserToRole(client, result.rows[0].id, options.userRole as number);

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
    // @ts-expect-error
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
    // @ts-expect-error
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
    // @ts-expect-error
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

export default PostgresAdapter;
