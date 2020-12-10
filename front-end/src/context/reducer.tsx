export {};

const authedUserString = localStorage.getItem("auth-user");

const user = authedUserString ? JSON.parse(authedUserString).user : "";
const token = authedUserString ? JSON.parse(authedUserString).token : "";

export type AuthReducerActionType = {
  type: string;
  error: null | Error | string;
  payload: {
    user: {
      id: string;
      email: string;
    };
    token: string;
  };
};

type InitialStateType = {
  user: string | { id: string; email: string };
  token: string;
  isLoading: boolean;
  errorMessage: null | Error | string;
};

export const initialState: InitialStateType = {
  user: user || "",
  token: token || "",
  isLoading: false,
  errorMessage: null,
};

export const actionTypes = {
  login_request: "LOGIN_REQUEST",
  login_success: "LOGIN_SUCCESS",
  login_error: "LOGIN_ERROR",
  logout: "LOGOUT",
};

export const AuthReducer = (
  initialState: InitialStateType,
  action: AuthReducerActionType
) => {
  switch (action.type) {
    case actionTypes.login_request:
      return {
        ...initialState,
        isLoading: true,
      };
    case actionTypes.login_success:
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
      };
    case actionTypes.login_error:
      return {
        ...initialState,
        isLoading: false,
        errorMessage: action.error,
      };
    case actionTypes.logout:
      return {
        ...initialState,
        user: "",
        token: "",
      };
    default:
      throw new Error(`Invaild action type: ${action.type}`);
  }
};
