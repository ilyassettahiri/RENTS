"use client";


import {useState, useEffect, useCallback, useMemo, useContext} from 'react';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import echo from 'src/utils/echo'; // Import Laravel Echo

import { AuthContext } from 'src/context/AuthContextProvider';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import { paths as getPaths } from 'src/routes/paths';
import useAuthDialog from 'src/hooks/use-authdialog';
import { AnimateBorder } from 'src/components/animate/animate-border';


import { LanguagePopover } from 'src/layouts/main/language-popover';

import { allLangs } from 'src/locales';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from 'src/theme/css';
import Logo from 'src/components/logo/logo';
import LoginDialog from 'src/sections/auth/login-dialog';


import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import HeaderShadow from './header-shadow';



export default function Header({ headerOnDark, onOpenNav}) {
  const theme = useTheme();
  const offset = useOffSetTop();
  const mdUp = useResponsive('up', 'md');
  const { t } = useTranslation();



  const { i18n } = useTranslation();
  const paths = useMemo(() => getPaths(i18n.language), [i18n.language]);

  const navigationData = navConfig(i18n.language);


  const { requireAuth, loginDialogOpen, handleLoginDialogClose } = useAuthDialog();

  const { getCurrentUser } = useContext(AuthContext);

  const [unreadCount, setUnreadCount] = useState(0);

  const handleFavoriteClick = useCallback(() => {
    requireAuth(() => {
      window.location.href = paths.eCommerce.wishlist;
    });
  }, [requireAuth, paths.eCommerce.wishlist]);




  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const userId = await getCurrentUser(); // Fetch the logged-in user's ID
        if (!userId) {

          return () => {}; // Return a no-op cleanup function
        }

        const channel = echo.private(`notifications.${userId}`);

        // Listen for .notification.sent
        channel.listen('.notification.sent', (event) => {

          setUnreadCount((prev) => prev + 1); // Increment unread notifications
        });

        channel.error((err) => {
          console.error("Channel error:", err);
        });

        return () => {
          channel.stopListening('.notification.sent');

        };
      } catch (error) {
        console.error("Error setting up notifications:", error);
      }
    };

    const unsubscribe = setupNotifications();

    // Cleanup on component unmount or when `getCurrentUser` changes
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [getCurrentUser]);

  const handleChatClick = useCallback(() => {
    requireAuth(() => {
      setUnreadCount(0); // Clear notifications on chat open
      window.location.href = paths.eCommerce.chat; // Navigate to chat
    });
  }, [requireAuth, paths.eCommerce.chat]);

  const renderContent = (
    <>

      {!mdUp && <NavMobile data={navigationData} />}

      <Box sx={{ lineHeight: 0, position: 'relative' }}>
        {/* Directly use the SVG here */}
        <Link component={RouterLink} href="/" aria-label="go to homepage">
          <Box
            sx={{
              width: 90,
              lineHeight: 0,
              cursor: 'pointer',
              display: 'inline-flex',
            }}
          >
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384.53 152.45"
              width="100%"
              height="auto"
            >
              <defs>
                <style>{`.cls-1{fill:#1e90ff;}`}</style>
              </defs>
              <path d="M150.21,39.72V53.66H119.06v16.7h31.15V83.94H119.06v16.71h31.15v13.94H105.06V39.72Z" />
              <path d="M225,39.72v74.87H211.33L178.82,65.51v49.08H164.87V39.72h13.64l32.14,49.44V39.72Z" />
              <path d="M293.28,39.72v14H272.72v60.88H258V53.71H237.8v-14Z" />
              <path d="M322.05,114.59q-15.1,0-23-15.61l11.7-7q5.13,9.61,11.64,9.61a9.44,9.44,0,0,0,6-2A6.26,6.26,0,0,0,330.7,95a9,9,0,0,0-1.63-5,36.3,36.3,0,0,0-3-3c-1.33-1.2-3-2.64-5-4.31q-5.71-4.76-9.46-8.38a41.57,41.57,0,0,1-5.48-6.19,17.78,17.78,0,0,1-3.67-10.23A17.16,17.16,0,0,1,308.1,45a20.07,20.07,0,0,1,13.95-5.32,20.81,20.81,0,0,1,10.33,2.66,24.06,24.06,0,0,1,5.08,3.45A60.17,60.17,0,0,1,343,51.31l-10.33,8.93Q327.5,53,322.05,53c-2,0-3.46.43-4.3,1.3a4.06,4.06,0,0,0-1.68,3.34,6.25,6.25,0,0,0,1,3.24q1,1.05,3.48,3.27t6.53,5.71q4.73,3.91,7.19,6.22c1.08,1,1.88,1.67,2.41,2.08q7.33,7,7.34,16.19A19.1,19.1,0,0,1,338,109Q332,114.59,322.05,114.59Z" />
              <path
                className="cls-1"
                d="M57.6,75.06H54.73V53.71h11.8a10.28,10.28,0,0,1,7.45,3A10.18,10.18,0,0,1,75.81,59a94.78,94.78,0,0,1,12.91-7.7,24.68,24.68,0,0,0-3.63-4.58,23.42,23.42,0,0,0-17.14-7H40.37V98.49A130.92,130.92,0,0,1,57.6,75.06Z"
              />
              <path d="M77.1,63.63c0,.17,0,.34,0,.52A10.45,10.45,0,0,1,74,71.83a10.07,10.07,0,0,1-7.45,3.23H61a100.65,100.65,0,0,0-20.6,25.76v13.77H54.73V89h8.34l13.69,25.59H92.17L77.49,87q14.69-7.22,14.68-22.4v-.73a24.82,24.82,0,0,0-.83-6.42A84.72,84.72,0,0,0,77.1,63.63Z" />
            </svg>
          </Box>
        </Link>
      </Box>


      <Stack
        flexGrow={1}
        alignItems="center"
        sx={{
          height: 1,
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <NavDesktop data={navigationData} />
      </Stack>
      <Box sx={{ flexGrow: { xs: 1, md: 'unset' } }} />
      <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
        <Stack spacing={1} direction="row" alignItems="center">






                <Box
                  sx={{
                    borderRadius: 1,
                    position: 'relative',
                    bgcolor: '#1e90ff',
                    color: 'background.paper',
                    display: { xs: 'none', md: 'inline-flex' },

                  }}
                >
                  <AnimateBorder
                    animate={{
                      duration: 12,
                      distance: 40,
                      color: ['#fff', '#D32F2F'],
                      outline: `135deg, ${alpha('#fff', 0.04)}, ${alpha('#D32F2F', 0.04)}`, // Use alpha from MUI
                    }}
                    sx={{ width: 1, height: 1, minHeight: 'auto', position: 'absolute' }}
                  />

                  <Button
                    variant="text"
                    rel="noopener"
                    target="_blank"
                    href="https://accounts.rents.ma"
                    sx={{ px: 2 }}
                  >
                    {t('createListing')}
                  </Button>
                </Box>




          <Stack spacing={3} direction="row" alignItems="center" flexGrow={1} justifyContent="flex-end">

          <LanguagePopover data-slot="localization" data={allLangs} />


            <Badge badgeContent={unreadCount} color="error">
              <IconButton onClick={handleChatClick} size="small" color="inherit">
                <Iconify icon="carbon:chat" width={24} />
              </IconButton>
            </Badge>

            <Badge badgeContent={0} color="info">
                <IconButton
                  onClick={onOpenNav} // This will open the Nav drawer or redirect to login
                  size="small"
                  color="inherit"
                  sx={{ p: 0 }}
                >
                  <Iconify icon="carbon:user" width={24} />
                </IconButton>

            </Badge>
          </Stack>
        </Stack>
      </Stack>

      <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />


    </>
  );

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.black',
          }),
          ...(offset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: 'text.primary',
            height: {
              md: HEADER.H_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            height: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: { lg: '50px' },
            paddingRight: { lg: '50px' },
          }}
        >
          {renderContent}
        </Container>
      </Toolbar>
      {offset && <HeaderShadow />}
    </AppBar>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
  onOpenNav: PropTypes.func, // Add this prop type
};
