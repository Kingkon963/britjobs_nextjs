import * as React from "react";
import { Cookies } from "react-cookie";
import { MeQuery, RegisterMutation } from "@graphQL/graphql-operations";
import { client } from "@graphQL/apolloClient";
import { useQuery } from "@apollo/client";
import Me from "@graphQL/queries/me.gql";

export enum AUTH_ACTIONS {
  LOGIN,
  FETCH_USER,
}

interface ActionType {
  type: AUTH_ACTIONS;
  payload?: any;
}

interface UserInfo {
  id: string;
  username: string;
  email?: string | null | undefined;
  confirmed?: boolean | null | undefined;
  blocked?: boolean | null | undefined;
  role?:
    | {
        __typename?: "UsersPermissionsMeRole";
        id: string;
        name: string;
      }
    | null
    | undefined;
}

interface AuthContextType {
  state: {
    userInfo?: UserInfo;
    isLogedin: boolean;
  };
  dispatch?: React.Dispatch<ActionType>;
}

const initContext: AuthContextType = {
  state: {
    userInfo: undefined,
    isLogedin: false,
  },
  dispatch: undefined,
};

export const AuthContext = React.createContext<AuthContextType>(initContext);
const cookies = new Cookies();

const reducer = (prevState: AuthContextType, action: ActionType): AuthContextType => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      if (action.payload) {
        // storing JWT
        cookies.set("jwt", (action.payload as RegisterMutation).register.jwt, {
          path: "/",
          maxAge: 3600 * 24 * 30,
          sameSite: true,
          //httpOnly: true,
          //secure: true,
        });
        // refetching Apollo store
        client.resetStore();

        const newUser: UserInfo = {
          id: action.payload.register.user.id,
          username: action.payload.register.user.username,
          email: action.payload.register.user.email,
          confirmed: action.payload.register.user.confirmed,
          blocked: action.payload.register.user.blocked,
        };

        return {
          ...prevState,
          state: { ...prevState.state, userInfo: newUser, isLogedin: true },
        };
      }
      return prevState;

    case AUTH_ACTIONS.FETCH_USER:
      if (action.payload && (action.payload as MeQuery).me?.__typename === "UsersPermissionsMe") {
        return {
          ...prevState,
          state: { ...prevState.state, userInfo: action.payload?.me, isLogedin: true },
        };
      }
      return prevState;

    default:
      throw new Error("Reducer doesn't have any handler for this Action");
  }
};

export const AuthProvider: React.FC = ({ children }) => {
  const [context, dispatch] = React.useReducer(reducer, initContext);
  const { loading, error, data } = useQuery<MeQuery>(Me);

  React.useEffect(() => {
    if (data?.me) {
      dispatch({ type: AUTH_ACTIONS.FETCH_USER, payload: data });
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ state: context.state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
