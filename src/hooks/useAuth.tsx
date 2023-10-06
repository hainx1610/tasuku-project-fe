import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

// children wont have to import AuthContext & useContext, only useAuth
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
