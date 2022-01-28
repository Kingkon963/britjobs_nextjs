import * as React from "react";
import { useReducer } from "react";
import Head from "next/head";
import Link from "next/link";
import { MdHome, MdError } from "react-icons/md";
import {
  UsersPermissionsLoginPayload,
  UsersPermissionsRegisterInput,
} from "@graphQL/graphql-operations";
import REGISTER from "@graphQL/mutations/register.gql";
import { useMutation } from "@apollo/client";
import keyGen from "@utils/genKey";

enum ACTIONS {
  SET_USERNAME,
  SET_EMAIL,
  SET_PASSWORD,
  SET_CONF_PASSWORD,
  SET_ERROR,
  RESET_ERROR,
  RESET,
}

interface ActionType {
  type: ACTIONS;
  payload?: string;
}

interface RegisterResponse {
  register: UsersPermissionsLoginPayload;
}

interface RegisterInput extends UsersPermissionsRegisterInput {
  error?: string;
  confirmPass: string;
}

const initState: RegisterInput = {
  username: "",
  email: "",
  password: "",
  confirmPass: "",
  error: undefined,
};

const reducer = (state: RegisterInput, action: ActionType): RegisterInput => {
  switch (action.type) {
    case ACTIONS.SET_USERNAME:
      if (action.payload !== undefined) {
        return { ...state, username: action.payload };
      }
      return state;

    case ACTIONS.SET_EMAIL:
      if (action.payload !== undefined) {
        return { ...state, email: action.payload };
      }
      return state;

    case ACTIONS.SET_PASSWORD:
      if (action.payload !== undefined) {
        return { ...state, password: action.payload };
      }
      return state;

    case ACTIONS.SET_CONF_PASSWORD:
      if (action.payload !== undefined) {
        return { ...state, confirmPass: action.payload };
      }
      return state;

    case ACTIONS.SET_ERROR:
      if (action.payload !== undefined) {
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
  const [runRegister, { loading, data, error }] = useMutation<RegisterResponse>(REGISTER, {
    errorPolicy: "all",
  });

  const isValidData = (): boolean => {
    if (state.username.length === 0) return false;
    if (state.email.length === 0) return false;
    if (state.password.length === 0) return false;
    if (state.password !== state.confirmPass) return false;

    return true;
  };

  const register = () => {
    dispatch({ type: ACTIONS.RESET_ERROR });

    console.log(state);
    if (isValidData()) {
      runRegister({
        variables: { username: state.username, email: state.email, password: state.password },
      });
    }
  };

  React.useEffect(() => {
    if (data) {
      dispatch({ type: ACTIONS.RESET });
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Head>
        <title>Britjobs | Register</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div className="absolute z-10 top-5 left-5">
        <Link href="/" passHref>
          <button className="btn btn-lg btn-circle">
            <MdHome className="text-3xl" />
          </button>
        </Link>
      </div>

      <div className="p-10 card bg-base-200 lg:w-3/12">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="username"
            className="input"
            value={state.username}
            onChange={(e) => dispatch({ type: ACTIONS.SET_USERNAME, payload: e.target.value })}
          />

          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input"
            value={state.email}
            onChange={(e) => dispatch({ type: ACTIONS.SET_EMAIL, payload: e.target.value })}
          />

          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input"
            value={state.password}
            onChange={(e) => dispatch({ type: ACTIONS.SET_PASSWORD, payload: e.target.value })}
          />

          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password again"
            className="input"
            value={state.confirmPass}
            onChange={(e) => dispatch({ type: ACTIONS.SET_CONF_PASSWORD, payload: e.target.value })}
          />

          <button
            className={`btn btn-primary mt-5 ${loading ? "loading" : ""}`}
            onClick={() => register()}
            disabled={loading}
          >
            Register
          </button>
          <label className="label">
            <span className="label-text-alt text-info cursor-pointer">
              <Link href="/login">Login</Link>
            </span>
          </label>
        </div>
        <div className="flex flex-col mt-2 gap-2">
          {state.error !== undefined && (
            <div className="alert alert-error">
              <div className="flex-1 items-center gap-2">
                <MdError className="text-lg" />
                <label>{state.error}</label>
              </div>
            </div>
          )}
          {error?.graphQLErrors.map(({ message }) => {
            return (
              <div className="alert alert-error" key={keyGen()}>
                <div className="flex-1 items-center gap-2">
                  <MdError className="text-lg" />
                  <label>{message}</label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Register;
