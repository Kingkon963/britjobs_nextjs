import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { MdHome } from "react-icons/md";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import UserRoles from "@utils/userRoles.";
import GoogleSignInButton from "@components/GoogleSignInButton";

const Login: React.FC = () => {
  const router = useRouter();
  const session = useSession();

  const handleSignIn = () => {
    signIn("google", {
      userRole: UserRoles.JOB_SEEKER,
    });
  };

  React.useEffect(() => {
    if (session.data) {
      console.log(session.data);
      if (session.data.isNewUser) router.replace("/auth/complete-profile");
      else {
        if (session.data.user.role?.name === UserRoles.JOB_SEEKER)
          router.replace("/seeker/dashboard");
        if (session.data.user.role?.name === UserRoles.JOB_PROVIDER)
          router.replace("/provider/dashboard");
      }
    }
  }, [router, session]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Head>
        <title>Britjobs | Login</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div className="absolute top-5 left-5 z-10">
        <Link href="/" passHref>
          <button className="btn btn-circle btn-lg">
            <MdHome className="text-3xl" />
          </button>
        </Link>
      </div>

      <div className="card w-3/12 min-w-fit bg-base-200 p-10">
        <GoogleSignInButton onClick={() => handleSignIn()} />
      </div>
    </div>
  );
};

export default Login;
