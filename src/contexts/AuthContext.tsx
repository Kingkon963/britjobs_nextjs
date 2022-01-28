import * as React from "react";
import { UsersPermissionsLoginPayload } from "@graphQL/graphql-operations";

enum ACTIONS {
  LOGIN,
}

interface ActionType {
  type: ACTIONS;
  payload?: string;
}

interface AuthContextType {
  state: {
    loginPayload?: UsersPermissionsLoginPayload;
  };
  dispatch?: React.Dispatch<ActionType>;
}

const initContext: AuthContextType = {
  state: {
    loginPayload: undefined,
  },
  dispatch: undefined,
};

export const AuthContext = React.createContext<AuthContextType>(initContext);

const reducer = (state: AuthContextType, action: ActionType): AuthContextType => {
  switch (action.type) {
    default:
      throw new Error("Reducer doesn't have any handler for this Action");
  }
};

export const AuthProvider: React.FC = ({ children }) => {
  const [context, dispatch] = React.useReducer(reducer, initContext);

  return (
    <AuthContext.Provider value={{ state: context.state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
