import * as React from "react";
import { useReducer, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { MdHome, MdError } from "react-icons/md";
import keyGen from "@utils/genKey";
import { useRouter } from "next/router";
import { signIn, useSession, getCsrfToken, getSession } from "next-auth/react";

enum ACTIONS {
  SET_USERTYPE,
  SET_ERROR,
  RESET_ERROR,
  RESET,
}

const UserTypes = {
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

interface Action {
  type: ACTIONS;
  payload?: string | number;
}

interface InitStateType {
  error?: string;
  userType?: number;
}

const initState: InitStateType = {
  error: undefined,
  userType: UserTypes.JOB_SEEKER,
};

const reducer = (state: InitStateType, action: Action): InitStateType => {
  switch (action.type) {
    case ACTIONS.SET_USERTYPE:
      if (action.payload !== undefined && typeof action.payload === "number") {
        return { ...state, userType: action.payload };
      }
      return state;

    case ACTIONS.SET_ERROR:
      if (action.payload !== undefined && typeof action.payload === "string") {
        return { ...state, error: action.payload };
      }
      return state;

    case ACTIONS.RESET_ERROR:
      return { ...state, error: undefined };

    case ACTIONS.RESET:
      return initState;

    default:
      throw new Error("Reducer doesn't have any handler for this Action");
  }
};

const Register: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignIn = () => {
    if (session) dispatch({ type: ACTIONS.SET_ERROR, payload: "You are already Logged in!" });
    if (typeof state.userType === undefined || typeof state.userType !== "number")
      dispatch({ type: ACTIONS.SET_ERROR, payload: "Please select a user type" });
    console.log(state);
    if (typeof state.error !== undefined) {
      signIn("google", {
        userRole: state.userType,
      });
    }
  };

  if (session) {
    if (session.user.isNewUser) router.replace("/profile");
    else router.replace("/dashboard");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Head>
        <title>Britjobs | Register</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div className="absolute top-5 left-5 z-10">
        <Link href="/" passHref>
          <button className="btn btn-circle btn-lg">
            <MdHome className="text-3xl" />
          </button>
        </Link>
      </div>

      <div className="w-full max-w-xl">
        <div className="card bg-base-200 p-10">
          <div className="form-control">
            {/* UserType Selection */}
            <div className="flex flex-col">
              <label className="label w-fit cursor-pointer">
                <input
                  type="radio"
                  name="radio-6"
                  className="radio  mr-5  checked:animate-spin checked:bg-red-500"
                  checked={state.userType === UserTypes.JOB_SEEKER}
                  readOnly
                  onClick={() =>
                    dispatch({ type: ACTIONS.SET_USERTYPE, payload: UserTypes.JOB_SEEKER })
                  }
                />
                <span className="label-text text-lg">I&apos;m searching Jobs</span>
              </label>
              <label className="label w-fit cursor-pointer">
                <input
                  type="radio"
                  name="radio-6"
                  className="radio  mr-5  checked:animate-spin checked:bg-red-500"
                  checked={state.userType === UserTypes.JOB_PROVIDER}
                  readOnly
                  onClick={() => {
                    dispatch({ type: ACTIONS.SET_USERTYPE, payload: UserTypes.JOB_PROVIDER });
                  }}
                />
                <span className="label-text text-lg">I&apos;m hiring</span>
              </label>
            </div>

            <div className="divider"></div>

            <button className="btn btn-primary" onClick={() => handleSignIn()}>
              Signin with Google
            </button>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {state.error !== undefined && (
              <div className="alert alert-error">
                <div className="flex-1 items-center gap-2">
                  <MdError className="text-lg" />
                  <label>{state.error}</label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
