"use client";

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useBoolean } from 'src/hooks/use-boolean';
import Nav from 'src/layouts/account/nav';
import Header from './header';
import Footer from './footer';
import Newsletter from './newsletter';
import { HEADER } from '../config-layout';

export default function MainLayout({ children, headerOnDark = false, disabledSpacing = false, sx, ...other }) {
  const navOpen = useBoolean();

  return (
    <Box
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
      {...other}
    >
      <Header headerOnDark={headerOnDark} onOpenNav={navOpen.onTrue} />



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
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
  disabledSpacing: PropTypes.bool,
  headerOnDark: PropTypes.bool,
  sx: PropTypes.object,
};
