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
  isLoading: boolean;
  errorMessage: string | Error | null;
};

type UserAuthContextValueType = {
  setUserData: undefined | React.Dispatch<AuthReducerActionType>;
  userData: undefined | AuthedUserData;
};

const UserAuthContextValue: UserAuthContextValueType = {
  setUserData: undefined,
  userData: undefined,
};

const UserAuthContext = React.createContext(UserAuthContextValue);

export const useAuthedUser = () => {
  const context = useContext(UserAuthContext);
  if (!context) throw new Error("Cant access context outside of the Provider");
  return context;
};

export const UserAuthProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useReducer(AuthReducer, initialState);
  return (
    <UserAuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserAuthContext.Provider>
  );
};
