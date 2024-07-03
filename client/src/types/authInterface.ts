export interface LoginAction {
  type: "LOGIN";
  payload: {
    token: string;
  };
}

export interface LogoutAction {
  type: "LOGOUT";
}

export interface SetAuthAction {
  type: "SET_AUTH";
  payload: {
    isLoggedIn: boolean;
    token: string | null;
  };
}

export type AuthAction = LoginAction | LogoutAction | SetAuthAction;
