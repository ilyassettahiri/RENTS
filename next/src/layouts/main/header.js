"use client";


import { useCallback} from 'react';


import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import useAuthDialog from 'src/hooks/use-authdialog';

import { LanguagePopover } from 'src/layouts/main/language-popover';

import { allLangs } from 'src/locales';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from 'src/theme/css';
import Logo from 'src/components/logo';
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



  const { requireAuth, loginDialogOpen, handleLoginDialogClose } = useAuthDialog();

  const handleFavoriteClick = useCallback(() => {
    requireAuth(() => {
      window.location.href = paths.eCommerce.wishlist;
    });
  }, [requireAuth]);



  const handleChatClick = useCallback(() => {
    requireAuth(() => {
      window.location.href = paths.eCommerce.vouchers;
    });
  }, [requireAuth]);




  const renderContent = (
    <>

      {!mdUp && <NavMobile data={navConfig} />}

      <Box sx={{ lineHeight: 0, position: 'relative' }}>
        <Logo/>
        <Link href="/" target="_blank" rel="noopener" />
      </Box>


      <Stack
        flexGrow={1}
        alignItems="center"
        sx={{
          height: 1,
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <NavDesktop data={navConfig} />
      </Stack>
      <Box sx={{ flexGrow: { xs: 1, md: 'unset' } }} />
      <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
        <Stack spacing={1} direction="row" alignItems="center">
          <Button
            variant="contained"
            color="inherit"
            href={paths.createlisting}
            target="_blank"
            rel="noopener"
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
            }}
          >
            Create Listing
          </Button>
          <Stack spacing={3} direction="row" alignItems="center" flexGrow={1} justifyContent="flex-end">

          <LanguagePopover data-slot="localization" data={allLangs} />

            <Badge badgeContent={2} color="info">
              <IconButton
                onClick={handleFavoriteClick}


                size="small"
                color="inherit"
                sx={{ p: 0 }}
              >
                <Iconify icon="carbon:notification" width={24} />
              </IconButton>
            </Badge>
            <Badge badgeContent={4} color="error" >
              <IconButton

                onClick={handleChatClick}

                size="small"
                color="inherit"
                sx={{ p: 0 }}
              >
                <Iconify icon="carbon:chat" width={24} />
              </IconButton>
            </Badge>
            <IconButton
              onClick={onOpenNav} // This will open the Nav drawer or redirect to login
              size="small"
              color="inherit"
              sx={{ p: 0 }}
            >
              <Iconify icon="carbon:user" width={24} />
            </IconButton>
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
            color: 'common.white',
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
            paddingLeft: { lg: '100px' },
            paddingRight: { lg: '100px' },
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
