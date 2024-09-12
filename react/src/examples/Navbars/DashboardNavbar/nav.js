import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate, useLocation } from "react-router-dom";  // Import useLocation
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';  // Replacement for useResponsive
import { useTranslation } from 'react-i18next';
import Iconify from 'components/iconify';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'context';
import CrudService from 'services/cruds-service';
import AuthService from 'services/auth-service';
import { Box } from '@mui/system';

export const paths = {
  nav: {
    reservation: '/reservation/all',
  },
};

const navigations = [
  { title: 'PersonalInfo', path: paths.nav.reservation, icon: <Iconify icon="carbon:user" /> },
  { title: 'Wishlist', path: paths.nav.reservation, icon: <Iconify icon="carbon:favorite" /> },
  { title: 'Messages', path: paths.nav.reservation, icon: <Iconify icon="carbon:chat" /> },
  { title: 'Reservations', path: paths.nav.reservation, icon: <Iconify icon="carbon:document" /> },
  { title: 'Payment', path: paths.nav.reservation, icon: <Iconify icon="carbon:purchase" /> },
];

export default function Nav({ open, onClose }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [image, setImage] = useState('/images/admin.jpg');
  const [fileState, setFileState] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await AuthService.getProfile();
      const userData = response.data.attributes;

      setUser({
        firstName: userData.firstName || '',
        name: userData.name || '',
        lastName: userData.lastName || '',
        emailAddress: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        birthday: userData.birthday || null,
        gender: userData.gender || 'Male',
        streetAddress: userData.streetAddress || '',
        zipCode: userData.zipCode || '',
        city: userData.city || '',
        country: userData.country || 'United States',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });

      const profileImageUrl = userData.profile_image
        ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${userData.profile_image}`
        : `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/images/member.jpg`;

      setImage(profileImageUrl);
    })();
  }, []);

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));  // Replacement for useResponsive

  const changeHandler = (e) => {
    const formData = new FormData();
    formData.append("attachment", e.target.files[0]);
    setFileState(formData);
    setImageUrl(URL.createObjectURL(e.target.files[0])); // Display selected image immediately
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { url } = await CrudService.imageUpload(fileState);
      const userData = {
        data: {
          type: "profile",
          attributes: {
            profile_image: url,
          },
        },
      };
      await AuthService.updateProfile(JSON.stringify(userData));
      const profileImageUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${url}`;
      setImage(profileImageUrl); // Update the image state with the new URL
      setImageUrl(null); // Clear the imageUrl to fallback to image
    } catch (err) {
      console.error(err);
    }
  };

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
          <Avatar src={imageUrl || image} sx={{ width: 64, height: 64 }} />
          <Stack direction="row" alignItems="center" sx={{ typography: 'caption', cursor: 'pointer', '&:hover': { opacity: 0.72 } }}>
            <input
              type="file"
              accept="image/*"
              onChange={changeHandler}
              style={{ display: 'none' }}
              id="profile-image-upload"
            />
          </Stack>
        </Stack>

        <Stack spacing={0.5} alignItems="center">
          <Typography variant="subtitle1" noWrap>
            {user ? `${user.name} ` : 'Loading...'}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {user ? user.emailAddress : 'Loading...'}
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
        <ListItemText
          primary={t(item.title)}
          primaryTypographyProps={{
            typography: 'body2',
            ...(active && { typography: 'subtitle2' }),
          }}
        />
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
