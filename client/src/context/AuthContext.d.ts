import { ReactNode } from "react";
import { AuthAction } from "./authTypes";

// Define the shape of the state
interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

// Define the context properties including state and dispatch
interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  logout: () => void;
}

export const AuthProvider: React.FC<{ children: ReactNode }>;
export const useAuth: () => AuthContextProps;
