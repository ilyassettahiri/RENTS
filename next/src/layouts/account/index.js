"use client";

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { alpha } from '@mui/material/styles';
import Link from '@mui/material/Link';

import Typography from '@mui/material/Typography';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import Iconify from 'src/components/iconify';
import AuthService from "src/services/auth-service";
import Nav from 'src/layouts/account/nav';
import TextMaxLine from 'src/components/text-max-line';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'src/context/AuthContextProvider';
import CrudService from 'src/services/cruds-service';

import { paths } from 'src/routes/paths';
import { useActiveLink } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { AuthContextProvider } from 'src/context/AuthContextProvider';
import Avatar from '@mui/material/Avatar';


const navigations = [
  { title: 'Personal Info', path: paths.eCommerce.personal, icon: <Iconify icon="carbon:user" /> },
  { title: 'Wishlist', path: paths.eCommerce.wishlist, icon: <Iconify icon="carbon:favorite" /> },
  { title: 'Vouchers', path: paths.eCommerce.vouchers, icon: <Iconify icon="carbon:cut-out" /> },
  { title: 'Orders', path: paths.eCommerce.orders, icon: <Iconify icon="carbon:document" /> },
  { title: 'Payment', path: paths.eCommerce.payment, icon: <Iconify icon="carbon:purchase" /> },
];

export default function AccountLayout({ children }) {
  const mdUp = useResponsive('up', 'md');
  const menuOpen = useBoolean();
  const [image, setImage] = useState(`${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/images/member.jpg`);

  const { getCurrentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});


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


  const renderContentFix = (
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
            <label htmlFor="profile-image-upload">
              <Iconify icon="carbon:edit" sx={{ mr: 1 }} />
              Change photo
            </label>
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
          <ListItemIcon>
            <Iconify icon="carbon:logout" />
          </ListItemIcon>
          <ListItemText
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
    <AuthContextProvider>


      <Container
        maxWidth={false}
        sx={{
          marginTop: '80px',
          paddingLeft: { lg: '100px' },
          paddingRight: { lg: '100px' },
        }}
      >
        <Stack
          direction={{
            md: 'row',
          }}
          alignItems={{
            md: 'flex-start',
          }}
          sx={{
            mb: {
              xs: 8,
              md: 10,
            },
          }}
        >
          <Nav open={menuOpen.value} onClose={menuOpen.onFalse} />

                {mdUp ? (
                    renderContentFix
                ) : (
                  <Box></Box>
                )}

          <Box
            sx={{
              flexGrow: 1,
              pl: { md: 8 },
              width: { md: `calc(100% - ${280}px)` },
            }}
          >
            {children}
          </Box>
        </Stack>
      </Container>
    </AuthContextProvider>
  );
}

AccountLayout.propTypes = {
  children: PropTypes.node,
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