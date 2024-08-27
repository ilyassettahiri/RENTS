 
/* eslint-disable react/prop-types */

 

import { useState, useEffect, useMemo, useContext } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import { setupAxiosInterceptors } from "services/interceptor";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Configurator from "examples/Configurator";

import SoftBox from "components/SoftBox";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React example components
import Sidenav from "examples/Sidenav";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Soft UI Dashboard PRO React routes
import routes from "routes";


// Soft UI Dashboard PRO React contexts
import { useSoftUIController,setMiniSidenav, AuthContext, setOpenConfigurator } from "context";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider


const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic paths for each image
const brand = `${imagePath}/logo-ct.png`;
const brandWhite = `${imagePath}/logo-ct.png`;
const brandDark = `${imagePath}/logo-ct-dark.png`;

export {
  brand,
  brandWhite,
  brandDark
};



import { getPermissions } from "config/Permissions";


import ProtectedRoute from "examples/ProtectedRoute";
import Login from "auth/login";
import Register from "auth/register";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";
import AuthService from "services/auth-service";

export default function App({ ability }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, sidenavColor,openConfigurator } = controller;
  
  const [rtlCache, setRtlCache] = useState(false);
  const { pathname } = useLocation();



  const authContext = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({ name: "", image: "" });

  const [hasStore, setHasStore] = useState(undefined); // Initialize hasStore state


  const navigate = useNavigate();
  setupAxiosInterceptors(() => {
    authContext.logout();
    navigate("/auth/login");
  });


    // Create a QueryClient instance
    const queryClient = useMemo(() => new QueryClient(), []);


  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  
  
  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

    
  // settings the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // settings page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);



  useEffect(() => {
    if (!authContext.isAuthenticated) return;
    (async () => {
      const id = await authContext.getCurrentUser();
      const response = await AuthService.getProfile();
      setUserDetails({
        name: response.data.attributes.name,
        email: response.data.attributes.email,

        profile_image: response.data.attributes.profile_image,
      });

      // Set hasStore state based on user profile
      const userHasStore = response.data.attributes.has_store;
      setHasStore(userHasStore);

      


      const rules = await getPermissions(id);
      ability.update(rules);
    })();
  }, [authContext.isAuthenticated]);



 

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={
              <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                {route.component}
              </ProtectedRoute>
            }
            key={route.key}
          />
        );
      }

      return null;
    });


   
    const configsButton = (
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="3.5rem"
        height="3.5rem"
        bgColor="white"
        shadow="sm"
        borderRadius="50%"
        position="fixed"
        right="2rem"
        bottom="2rem"
        zIndex={99}
        color="dark"
        sx={{ cursor: "pointer" }}
        onClick={handleConfiguratorOpen}
      >
        <Icon fontSize="default" color="inherit">
          settings
        </Icon>
      </SoftBox>
    );




  

  return (
        <QueryClientProvider client={queryClient}> 

        
            direction === "rtl" ? (
              <CacheProvider value={rtlCache}>
                <ThemeProvider theme={themeRTL}>
                  <CssBaseline />
                  {layout === "dashboard" && (
                    <>
                      <Sidenav
                        color={sidenavColor}
                        brand={brand}
                        brandName=""
                        routes={routes}
                        hasStore={hasStore}  // Make sure hasStore is being passed correctly

                      
                      />
                      <Configurator user={userDetails} />
                      {configsButton}
                      
                    </>
                  )}
                  {layout === "vr" }
                  <Routes>
                    <Route path="/auth/login" element={<Login />} />
                          {getRoutes(routes)}
                          <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </ThemeProvider>
              </CacheProvider>
            ) : (
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {layout === "dashboard" && (
                  <>
                    <Sidenav
                      color={sidenavColor}
                      brand={brand}
                      brandName="Soft UI Dashboard PRO"
                      routes={routes}
                      hasStore={hasStore}  // Make sure hasStore is being passed correctly

                    />
                    <Configurator user={userDetails}/>
                    {configsButton}
                    
                  </>
                )}
                {layout === "vr" }
                <Routes>
                  <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                        <Route path="/auth/reset-password" element={<ResetPassword />} />
                        {getRoutes(routes)}
                      
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
              </ThemeProvider>
            );

        </QueryClientProvider>

      );

}
