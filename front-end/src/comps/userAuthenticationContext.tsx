import React from "react";

export const isUserAuthed = async (getAuthStat: (data: any) => any) => {
  try {
    const resp = await fetch("/isUserAuthed");
    const result = await resp.json();
    getAuthStat(result);
  } catch (err) {
    console.log("err->>", err);
  }
};

const UserAuthenticationContext = React.createContext(false);

export default UserAuthenticationContext;
