import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import  Image  from 'components/image';
import SoftBox from "components/SoftBox";

import { alpha } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import { Link, useNavigate, useLocation } from "react-router-dom";  // Import useLocation
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';  // Replacement for useResponsive
import { useTranslation } from 'react-i18next';
import Iconify from 'components/iconify';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'context';
import CrudService from 'services/cruds-service';
import AuthService from 'services/auth-service';
import { Box } from '@mui/system';
import SoftTypography from "components/SoftTypography";

export const paths = {
  nav: {
    account: '/settings/account',
    team: '/settings/team',
    security: '/settings/security',

  },
};

const navigations = [
  { title: 'Account', path: paths.nav.account, icon: <Iconify icon="carbon:user" /> },
  { title: 'Team', path: paths.nav.team, icon: <Iconify icon="carbon:favorite" /> },
  { title: 'Security', path: paths.nav.security, icon: <Iconify icon="carbon:chat" /> },
];

export default function Nav({ open, onClose, userDetails }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
 
 
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));  // Replacement for useResponsive


 

  const handleLogOut = async () => {
    try {
      await AuthService.logout();
      authContext.logout();
      navigate(`/`);
    } catch (err) {
      console.error(err);
    }
    return undefined;
  };

  const renderContent = (
    <Stack
      sx={{
        flexShrink: 0,
        borderRadius: 2,
        width: 1,
        ...(mdUp && {
          width: 280,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }),
      }}
    >
      <Stack spacing={2} sx={{ p: 3, pb: 2 }} alignItems="center">
        <Stack spacing={2} direction="row" alignItems="center">
          

          <SoftBox width="2.7rem" >

            <Image
                src={`${process.env.REACT_APP_IMAGE_BASE_URL}${userDetails.image}`}
              
                ratio="1/1"
                width="100%"
                sx={{ borderRadius: '25px' }}
                
            />
          </SoftBox>


          <Stack direction="row" alignItems="center" sx={{ typography: 'caption', cursor: 'pointer', '&:hover': { opacity: 0.72 } }}>
            
          </Stack>
        </Stack>

        <Stack spacing={0.5} alignItems="center">
          <Typography variant="subtitle1" noWrap>
            {userDetails ? `${userDetails.name} ` : 'Loading...'}
            
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {userDetails ? userDetails.email : 'Loading...'}
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        {navigations.map((item) => (
          <NavItem key={item.title} item={item} onClose={onClose} />
        ))}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        <ListItemButton
          sx={{ px: 1, height: 44, borderRadius: 1 }}
          onClick={handleLogOut}
        >
          <ListItemIcon>
            <Iconify icon="carbon:logout" />
          </ListItemIcon>
          <ListItemText
            primary={t('Logout')}
            primaryTypographyProps={{ typography: 'body2' }}
          />
        </ListItemButton>
      </Stack>
    </Stack>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 280 } }}
    >
      {renderContent}
    </Drawer>
  );
}

Nav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  userDetails: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

function NavItem({ item, onClose }) {
  const { pathname } = useLocation();  // Get the current path using useLocation
  const { t } = useTranslation();

  // Determine if the current path matches the item's path
  const active = pathname === item.path;

  return (
    <Link
      component={Link}  // Use Link component for navigation
      key={item.title}
      to={item.path}  // Use 'to' instead of 'href' in react-router-dom
      color={active ? 'primary' : 'inherit'}
      underline="none"
      onClick={onClose}
    >
      <ListItemButton sx={{ px: 1, height: 44, borderRadius: 1 }}>
        <ListItemIcon>{item.icon}</ListItemIcon>

        <SoftTypography variant="button" color="dark" fontWeight="regular">

            <ListItemText
              primary={t(item.title)}
              
              primaryTypographyProps={{
                typography: 'body2',
                ...(active && { typography: 'subtitle2' }),
              }}
            />
        </SoftTypography>


      </ListItemButton>
    </Link>
  );
}

NavItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    path: PropTypes.string,
    title: PropTypes.string,
  }),
  onClose: PropTypes.func,

};
