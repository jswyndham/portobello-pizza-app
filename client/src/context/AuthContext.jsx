import { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
  isLoggedIn: false,
  token: null,
};

// Define reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true, token: action.payload.token };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, token: null };
    case "SET_AUTH":
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log("Checking authentication status...");
        const response = await fetch(
          "http://localhost:5001/api/v1/auth/status",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Authentication status:", data);
          dispatch({
            type: "SET_AUTH",
            payload: { isLoggedIn: data.isLoggedIn, token: data.token },
          });
        } else {
          dispatch({
            type: "SET_AUTH",
            payload: { isLoggedIn: false, token: null },
          });
          console.log("Failed to fetch authentication status");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
        dispatch({
          type: "SET_AUTH",
          payload: { isLoggedIn: false, token: null },
        });
      }
    };

    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch({ type: "LOGOUT" });
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
