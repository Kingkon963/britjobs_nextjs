import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: number;
    jwt: string;
    isNewUser?: boolean;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: number;
    jwt: string;
    user: {
      isNewUser?: boolean;
      role?: {
        id: number;
        name: string;
        description: string;
      };
    } & DefaultSession["user"];
  }
}
