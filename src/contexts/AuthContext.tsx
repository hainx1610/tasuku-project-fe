//@ts-nocheck
import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";
import { TAuthState, TLoginObj, TRegisterObj } from "@/types";

const initialState: TAuthState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";

const reducer = (state: TAuthState, action: any) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // JWT protocols
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const updatedProfile = useSelector((state) => state.user.updatedProfile);

  const autoLogin = async () => {
    const response = await apiService.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );

    const { user, accessToken } = response.data.data;

    // save accessToken to apiService for future use after login
    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        try {
          await autoLogin();
        } catch (error) {
          console.log(error);
        }

        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await apiService.get("/users/me");
          // api to get current user info
          const user = response.data.data;

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user },
            // user is authenticated, so change to true
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
            // user is not authenticated, navigate back to login page
          });
        }
      } catch (error) {
        console.error(error);
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null },
          // user is not authenticated, navigate back to login page
        });
      }
    };
    initialize();
  }, []);

  const login = async (
    { email, password }: TLoginObj,
    callback: () => void
  ) => {
    const response = await apiService.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    const { user, accessToken } = response.data.data;

    // save accessToken to apiService for future use after login
    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });

    callback();
  };

  const register = async (
    { name, email, password }: TRegisterObj,
    callback: () => void
  ) => {
    const response = await apiService.post(
      "/users",
      {
        name,
        email,
        password,
        role: "manager",
      },
      { withCredentials: true }
    );
    const { user, accessToken } = response.data.data;

    // save accessToken to apiService for future use after login
    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user },
    });
    callback();
  };

  const logout = async (callback: () => void) => {
    await apiService.delete("auth/logout", { withCredentials: true });
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
