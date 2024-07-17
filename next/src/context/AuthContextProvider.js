import { createContext, useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';
import AuthService from "src/services/auth-service";
import CrudService from "src/services/cruds-service";

// The authentication context
const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  getCurrentUser: () => {},
  getRole: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("authToken");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const getCurrentUser = useCallback(async () => {
    try {
      if (!token) return null;
      const res = await AuthService.getProfile();
      return res.data.id;
    } catch (err) {
      console.error("Error fetching current user:", err);
      return null;
    }
  }, [token]);

  const getRole = useCallback(async () => {
    try {
      const id = await getCurrentUser();
      if (!id) return null;

      const res = await CrudService.getUser(id);
      const roleId = res.data.relationships.roles.data[0].id;

      if (roleId === "1") {
        return "admin";
      }
      if (roleId === "2") {
        return "creator";
      }
      if (roleId === "3") {
        return "member";
      }
      return res.included[0].attributes.name;
    } catch (err) {
      console.error("Error fetching user role:", err);
      return null;
    }
  }, [getCurrentUser]);

  const contextValue = useMemo(() => ({
    token,
    isAuthenticated,
    getCurrentUser,
    getRole,
  }), [token, isAuthenticated, getCurrentUser, getRole]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider, AuthContext };
