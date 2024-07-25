import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import { paths } from 'src/routes/paths';
import { useActiveLink } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'src/context/AuthContextProvider';
import CrudService from 'src/services/cruds-service';
import AuthService from 'src/services/auth-service';
import { Box } from '@mui/system';

const navigations = [
  { title: 'Personal Info', path: paths.eCommerce.personal, icon: <Iconify icon="carbon:user" /> },
  { title: 'Wishlist', path: paths.eCommerce.wishlist, icon: <Iconify icon="carbon:favorite" /> },
  { title: 'Vouchers', path: paths.eCommerce.vouchers, icon: <Iconify icon="carbon:cut-out" /> },
  { title: 'Orders', path: paths.eCommerce.orders, icon: <Iconify icon="carbon:document" /> },
  { title: 'Payment', path: paths.eCommerce.payment, icon: <Iconify icon="carbon:purchase" /> },
];

export default function Nav({ open, onClose }) {
  const authContext = useContext(AuthContext);

  const { getCurrentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [image, setImage] = useState('/images/member.jpg');
  const [fileState, setFileState] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await AuthService.getProfile();

      const userData = response.data.attributes;

      setUser({
        firstName: userData.firstName || '',
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
      window.location.href = "/"; // Redirect to home page after successful logout
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
      <Stack spacing={2} sx={{ p: 3, pb: 2 }}>
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

        <Stack spacing={0.5}>
          <TextMaxLine variant="subtitle1" line={1}>
            {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
          </TextMaxLine>
          <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
            {user ? user.emailAddress : 'Loading...'}
          </TextMaxLine>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        {navigations.map((item) => (
          <NavItem key={item.title} item={item} />
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
        >
          <ListItemIcon onClick={handleLogOut}>
            <Iconify icon="carbon:logout" />
          </ListItemIcon>
          <ListItemText
            onClick={handleLogOut}
            primary="Logout"
            primaryTypographyProps={{
              typography: 'body2',
            }}
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
      PaperProps={{
        sx: {
          width: 280,
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}

Nav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

function NavItem({ item }) {
  const active = useActiveLink(item.path);

  return (
    <Link
      component={RouterLink}
      key={item.title}
      href={item.path}
      color={active ? 'primary' : 'inherit'}
      underline="none"
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
          primary={item.title}
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
};
