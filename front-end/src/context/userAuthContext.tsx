import React, { useContext, useReducer } from "react";

import { AuthReducer, initialState, AuthReducerActionType } from "./reducer";

type AuthedUserData = {
  user:
    | string
    | {
        id: string;
        email: string;
      };
  token: string;
};

type UserAuthContextValueType = {
  dispatch: undefined | React.Dispatch<AuthReducerActionType>;
  userData: undefined | AuthedUserData;
};

const UserAuthContextValue: UserAuthContextValueType = {
  dispatch: undefined,
  userData: undefined,
};

const UserAuthContext = React.createContext(UserAuthContextValue);

export const useAuthedUserContext = () => {
  const context = useContext(UserAuthContext);
  if (!context) throw new Error("Cant access context outside of the Provider");
  return context;
};

export const UserAuthProvider: React.FC = ({ children }) => {
  const [userData, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <UserAuthContext.Provider value={{ userData, dispatch }}>
      {children}
    </UserAuthContext.Provider>
  );
};
