export {};

type PayloadType = {
  user: {
    id: string;
    email: string;
  };
  token: string;
};

export type AuthReducerActionType = {
  type: string;
  payload: boolean | PayloadType;
};

type InitialStateType = {
  user: string | { id: string; email: string };
  token: string;
};

const authedUserString = localStorage.getItem("auth_user");

const user = authedUserString ? JSON.parse(authedUserString).user : "";
const token = authedUserString ? JSON.parse(authedUserString).token : "";

export const initialState: InitialStateType = {
  user: user || "",
  token: token || "",
};

export const actionTypes = {
  login_success: "LOGIN_SUCCESS",
  logout: "LOGOUT",
};

export const AuthReducer = (
  initialState: InitialStateType,
  action: AuthReducerActionType
) => {
  switch (action.type) {
    case actionTypes.login_success:
      if (typeof action.payload !== "boolean")
        return {
          ...initialState,
          user: action.payload.user,
          token: action.payload.token,
        };
      return initialState;

    case actionTypes.logout:
      return {
        ...initialState,
        user: "",
        token: "",
      };

    default:
      return initialState;
  }
};
