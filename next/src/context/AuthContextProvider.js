/* eslint-disable react/prop-types */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';
import CrudService from "src/services/cruds-service";
import AuthService from "src/services/auth-service";

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

  const getCurrentUser = async () => {
    if (!token) return null;
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
    if (!id) return null;
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
    <AuthContext.Provider value={{ token, isAuthenticated, getCurrentUser, getRole }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider, AuthContext };
