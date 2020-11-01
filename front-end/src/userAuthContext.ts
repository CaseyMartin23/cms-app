import React from "react";

type UserAuthContextDefaultValueType = {
  authorizedUser: {};
  onLogout: undefined | (() => Promise<void>);
  onLogin: undefined | ((data: any) => Promise<void>);
  onRegister: undefined | ((data: any) => Promise<void>);
  isAuthenticated: undefined | boolean;
};

const UserAuthContextDefaultValue: UserAuthContextDefaultValueType = {
  authorizedUser: {},
  onLogout: undefined,
  onLogin: undefined,
  onRegister: undefined,
  isAuthenticated: undefined,
};

export const UserAuthContext = React.createContext(UserAuthContextDefaultValue);
export const UserAuthProvider = UserAuthContext.Provider;
