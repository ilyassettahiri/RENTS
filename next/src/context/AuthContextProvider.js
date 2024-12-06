'use client';


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
  userId: null,
  emailVerified: true,
  login: () => {},
  register: () => {},
  logout: () => {},

  getRole: () => {},
  selectedCategory: null,
  handleCategoryClick: () => {},
});

const AuthContextProvider = ({ children, initialAuthState = false  }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userId, setUserId] = useState(null); // Store userId here
  const [emailVerified, setEmailVerified] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('authToken');
      if (token) {
        setIsAuthenticated(true);
        try {
          const res = await AuthService.getProfile();
          setUserId(res.data.id); // Set userId during initialization
          setEmailVerified(!!res.data.attributes.email_verified_at); // Set email verification status

        } catch (err) {
          console.error('Error fetching user profile:', err);
        }
      }
    };
    initializeAuth();
  }, []);


  const login = useCallback((accessToken) => {
    Cookies.set("authToken", accessToken, { expires: 1, sameSite: 'Strict', secure: true });
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("authToken");
    setIsAuthenticated(false);
    setUserId(null); // Clear userId on logout

  }, []);



  const getRole = useCallback(async () => {
    if (!userId) return null;
    try {
      const res = await CrudService.getUser(userId);
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
  }, [userId]);


  const handleCategoryClick = useCallback(async (category) => {
    setSelectedCategory(category);

    try {
      const city = "all-cities"; // Default city value
      await router.push(`/en/${city}/${category}`);
    } catch (error) {
      console.error('Router push error:', error);
    }
  }, [router]);




  // Memoize the context value to prevent it from changing on every render
  const contextValue = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
    userId,
    emailVerified, // Add this

    login,
    logout,
    getRole,

    selectedCategory,
    handleCategoryClick,
  }), [isAuthenticated, userId, emailVerified, login, logout, getRole, selectedCategory, handleCategoryClick]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialAuthState: PropTypes.bool,
};

export { AuthContextProvider };
