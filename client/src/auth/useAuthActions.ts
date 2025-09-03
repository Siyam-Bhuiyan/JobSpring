import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useAuthActions = () => {
  const { logout: contextLogout, ...authState } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    contextLogout();
    navigate('/');
  };

  return {
    ...authState,
    logout,
  };
};
