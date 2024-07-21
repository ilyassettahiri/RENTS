import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';
import AuthService from "src/services/auth-service";
import CrudService from "src/services/cruds-service";

// The authentication context
export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  register: () => {},
  logout: () => {},
  getCurrentUser: () => {},
  getRole: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = Cookies.get("authToken");

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const login = (accessToken) => {
    Cookies.set("authToken", accessToken, { expires: 1, sameSite: 'Strict', secure: true });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("authToken");
    setIsAuthenticated(false);
  };

  const getCurrentUser = async () => {
    try {
      const res = await AuthService.getProfile();
      return res.data.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getRole = async () => {
    const id = await getCurrentUser();
    try {
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
      console.error(err);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, getRole, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider };
