import { createContext, useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';
import { useRouter } from 'src/routes/hooks';
import NProgress from 'nprogress';

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
  selectedCategory: null,
  handleCategoryClick: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  const token = Cookies.get("authToken");

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const login = useCallback((accessToken) => {
    Cookies.set("authToken", accessToken, { expires: 1, sameSite: 'Strict', secure: true });
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("authToken");
    setIsAuthenticated(false);
  }, []);

  const getCurrentUser = useCallback(async () => {
    try {
      const res = await AuthService.getProfile();
      return res.data.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  }, []);

  const getRole = useCallback(async () => {
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
  }, [getCurrentUser]);


  const handleCategoryClick = useCallback((category) => {
    setSelectedCategory(category);
    NProgress.start();

    router.push(`/?searchCategories=${category}`).then(() => {
      NProgress.done();
    }).catch(() => {
      NProgress.done();
    });
  }, [router]);

  // Memoize the context value to prevent it from changing on every render
  const contextValue = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
    getRole,
    getCurrentUser,
    selectedCategory,
    handleCategoryClick,
  }), [isAuthenticated, login, logout, getRole, getCurrentUser, selectedCategory, handleCategoryClick]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider };
