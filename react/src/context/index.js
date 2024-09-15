/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import CrudService from "services/cruds-service";
import AuthService from "services/auth-service";

const SoftUI = createContext(null);

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

  const [hasStore, setHasStore] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const token = Cookies.get("authToken");

  useEffect(() => {
    if (!token) return;
    setIsAuthenticated(true);
    navigate(location.pathname);
  }, [token, navigate, location.pathname]);

  useEffect(() => {
    if (!token) return;
    navigate(location.pathname);
  }, [isAuthenticated, token, navigate, location.pathname]);

  const login = (newToken) => {
    Cookies.set("authToken", newToken, { expires: 1, sameSite: 'Strict', secure: true });
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const logout = () => {
    Cookies.remove("authToken");
    setIsAuthenticated(false);
    navigate("/auth/login");
  };

  const getCurrentUser = async () => {
    try {
      const res = await AuthService.getProfile();
          
      const hasStore = res.data.attributes.has_store;
      
      setHasStore(hasStore); // Set the hasStore value in the context


      return res.data.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getRole = async () => {
    // First, get the current user ID
    const id = await getCurrentUser();
    try {
      // Second, get the user with role
      const res = await CrudService.getUser(id);
      const roleId = res.data.relationships.roles.data[0].id;
      // Third, check the role ID and return the role type
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

// Settings custom name for the context which is visible on react dev tools
SoftUI.displayName = "SoftUIContext";

// Soft UI Dashboard PRO React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Soft UI Dashboard PRO React context provider
function SoftUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: true,
    transparentNavbar: true,
    direction: "ltr",
    

    layout: "pages",
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <SoftUI.Provider value={value}>{children}</SoftUI.Provider>;
}

// Soft UI Dashboard PRO React custom hook for using context
function useSoftUIController() {

  const context = useContext(SoftUI);

  if (!context) {
    throw new Error("useSoftUIController should be used inside the SoftUIControllerProvider.");
  }

  return context;
}

// Typechecking props for the SoftUIControllerProvider
SoftUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });

const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });

export {
  AuthContextProvider,
  SoftUIControllerProvider,
  useSoftUIController,
  setMiniSidenav,
  setTransparentNavbar,

  setDirection,
  setLayout,
};
