"use client";



import { useContext } from 'react';
import { AuthContext } from 'src/context/AuthContextProvider';
import { paths } from 'src/routes/paths';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useBoolean } from 'src/hooks/use-boolean';
import Nav from 'src/layouts/account/nav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { HEADER } from '../config-layout';
import Header from './header';

import Newsletter from './newsletter';
import Footer from './footer';

const queryClient = new QueryClient();

export default function MainLayout({ children, headerOnDark = false, disabledSpacing = false, sx, ...other }) {
  const navOpen = useBoolean();
  const { isAuthenticated } = useContext(AuthContext);

  const handleOpenNav = () => {
    if (isAuthenticated) {
      navOpen.onTrue();
    } else {
      window.location.href = paths.login;
    }
  };

  return (

    <QueryClientProvider client={queryClient}>


        <Box
          sx={{
            height: 1,
            display: 'flex',
            flexDirection: 'column',
            ...sx,
          }}
          {...other}
        >
          <Header headerOnDark={headerOnDark} onOpenNav={handleOpenNav} />

          {isAuthenticated && <Nav open={navOpen.value} onClose={navOpen.onFalse} />}

          <Box component="main" sx={{ flexGrow: 1 }}>
            {!(disabledSpacing || headerOnDark) && (
              <Box
                sx={{
                  height: { xs: HEADER.H_MOBILE, md: HEADER.H_DESKTOP },
                }}
              />
            )}
            {children}
          </Box>

          <Newsletter />
          <Footer />
        </Box>

    </QueryClientProvider>


  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
  disabledSpacing: PropTypes.bool,
  headerOnDark: PropTypes.bool,
  sx: PropTypes.object,
};
