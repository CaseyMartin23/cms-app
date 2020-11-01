import React from "react";

type UserAuthContextDefaultValueType = {
  authorizedUser: {};
  onLogout: undefined | (() => void);
  onLogin: undefined | (() => void);
  isAuthenticated: boolean;
};

const UserAuthContextDefaultValue: UserAuthContextDefaultValueType = {
  authorizedUser: {},
  onLogout: undefined,
  onLogin: undefined,
  isAuthenticated: false,
};

export const UserAuthContext = React.createContext(UserAuthContextDefaultValue);
export const UserAuthProvider = UserAuthContext.Provider;
