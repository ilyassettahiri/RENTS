import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';

import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import { paths } from 'src/routes/paths';
import { useRouter, useActiveLink } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'src/context/AuthContextProvider';
import CrudService from 'src/services/cruds-service';
import AuthService from 'src/services/auth-service';
import { Box } from '@mui/system';

import { useSettingsContext } from 'src/components/settings/context'; // Import useSettingsContext
import BaseOptions from 'src/components/settings/drawer/base-options'; // Import BaseOptions



const navigations = [
  { title: 'PersonalInfo', path: paths.eCommerce.personal, icon: <Iconify icon="carbon:user" /> },
  { title: 'Wishlist', path: paths.eCommerce.wishlist, icon: <Iconify icon="carbon:favorite" /> },
  { title: 'Messages', path: paths.eCommerce.vouchers, icon: <Iconify icon="carbon:chat" /> },
  { title: 'Reservations', path: paths.eCommerce.orders, icon: <Iconify icon="carbon:document" /> },
  { title: 'Payment', path: paths.eCommerce.payment, icon: <Iconify icon="carbon:purchase" /> },
];

export default function Nav({ open, onClose }) {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const settings = useSettingsContext(); // Use settings context
  const { t } = useTranslation();

  const { getCurrentUser } = useContext(AuthContext);
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

  const mdUp = useResponsive('up', 'md');

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
      router.push(`/`);

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
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              typography: 'caption',
              cursor: 'pointer',
              '&:hover': { opacity: 0.72 },
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={changeHandler}
              style={{
                display: 'none',
              }}
              id="profile-image-upload"
            />
          </Stack>
        </Stack>

        <Stack spacing={0.5} alignItems="center">
          <TextMaxLine variant="subtitle1" line={1}>
            {user ? `${user.name} ` : 'Loading...'}
          </TextMaxLine>
          <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
            {user ? user.emailAddress : 'Loading...'}
          </TextMaxLine>
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
          sx={{
            px: 1,
            height: 44,
            borderRadius: 1,
          }}
          onClick={handleLogOut}  // Add onClick to close drawer on logout

        >
          <ListItemIcon onClick={handleLogOut}>
            <Iconify icon="carbon:logout" />
          </ListItemIcon>
          <ListItemText
            onClick={handleLogOut}
            primary={t('Logout')}
            primaryTypographyProps={{
              typography: 'body2',
            }}
          />
        </ListItemButton>
      </Stack>
    </Stack>
  );


  const renderMode = (

    <Stack sx={{ my: 1, px: 2 }}>

        <ListItemButton
          sx={{
            px: 2,
            py: 1.5,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onClick={() =>
            settings.onUpdate('themeMode', settings.themeMode === 'dark' ? 'light' : 'dark')
          }
        >
          <Typography variant="subtitle2">
            {settings.themeMode === 'dark' ? t('LightMode') : t('DarkMode')}
          </Typography>
          <IconButton>
            <Iconify icon={settings.themeMode === 'dark' ? 'carbon:asleep-filled' : 'carbon:asleep'} />
          </IconButton>
        </ListItemButton>
    </Stack>


  );


  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
        },
      }}
    >
      {renderContent}
      <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

      {renderMode}
    </Drawer>
  );
}

Nav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

function NavItem({ item, onClose }) {
  const active = useActiveLink(item.path);
  const { t } = useTranslation();

  return (
    <Link
      component={RouterLink}
      key={item.title}
      href={item.path}
      color={active ? 'primary' : 'inherit'}
      underline="none"
      onClick={onClose}  // Close drawer on click

    >
      <ListItemButton
        sx={{
          px: 1,
          height: 44,
          borderRadius: 1,
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primary={t(item.title)}
          primaryTypographyProps={{
            typography: 'body2',
            ...(active && {
              typography: 'subtitle2',
            }),
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
  onClose: PropTypes.func,  // Add onClose prop type

};
