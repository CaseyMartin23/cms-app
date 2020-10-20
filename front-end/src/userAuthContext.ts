import React from "react";

type UserAuthType = {
  isAuthed: boolean;
  setIsAuthed: undefined | React.Dispatch<React.SetStateAction<boolean>>;
};

const userAuth: UserAuthType = {
  isAuthed: false,
  setIsAuthed: undefined,
};

export const UserAuthContext = React.createContext(userAuth);
export const UserAuthProvider = UserAuthContext.Provider;
