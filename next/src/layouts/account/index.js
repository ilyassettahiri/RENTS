"use client";

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { alpha } from '@mui/material/styles';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import { useContext, useEffect, useState, useMemo } from 'react';
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Skeleton from '@mui/material/Skeleton';

import Cookies from 'js-cookie';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import AuthService from 'src/services/auth-service';
import CrudService from 'src/services/cruds-service';
import { paths as getPaths } from 'src/routes/paths';
import { useRouter, useActiveLink } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { AuthContext, AuthContextProvider } from 'src/context/AuthContextProvider';
import Nav from 'src/layouts/account/nav';



export default function AccountLayout({ children }) {
  const mdUp = useResponsive('up', 'md');
  const menuOpen = useBoolean();
  const { t } = useTranslation();

  const authContext = useContext(AuthContext);

  const router = useRouter();

  const { locale } = useRouter();
  const paths = getPaths(locale);

  const { getCurrentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [isImageSelected, setIsImageSelected] = useState(false);

  const navigations = [
    { title: 'PersonalInfo', path: paths.eCommerce.personal, icon: <Iconify icon="carbon:user" /> },
    { title: 'Wishlist', path: paths.eCommerce.wishlist, icon: <Iconify icon="carbon:favorite" /> },
    { title: 'Messages', path: paths.eCommerce.vouchers, icon: <Iconify icon="carbon:chat" /> },
    { title: 'Reservations', path: paths.eCommerce.orders, icon: <Iconify icon="carbon:document" /> },
    { title: 'Payment', path: paths.eCommerce.payment, icon: <Iconify icon="carbon:purchase" /> },
  ];

  const [imageUrl, setImageUrl] = useState(null);
  const [fileState, setFileState] = useState(null);

  // Fetch User Profile
  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: AuthService.getProfile,
    onError: (error) => {
      console.error("Failed to fetch user profile:", error);
    },
  });


  const user = useMemo(() => {
    if (!userProfile) return {};

    const userData = userProfile.data.attributes;
    return {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      emailAddress: userData.email || "",

    };
  }, [userProfile]);


  const image = useMemo(() => {
    if (!userProfile) return `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/images/member.jpg`;

    const userData = userProfile.data.attributes;
    return userData.profile_image
      ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${userData.profile_image}`
      : `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/images/member.jpg`;
  }, [userProfile]);



  const changeHandler = (e) => {
    const formData = new FormData();
    formData.append("attachment", e.target.files[0]);
    setFileState(formData);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setIsImageSelected(true);

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
      setImageUrl(profileImageUrl);

      setIsImageSelected(false);
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




// Conditional rendering for Edit and Save buttons
const renderEditOrSaveButton = isImageSelected ? (

    <>
      <Stack
        direction="row"
        alignItems="center"
        onClick={() => document.getElementById('profile-image-upload').click()}
        sx={{
          typography: 'caption',
          cursor: 'pointer',
          '&:hover': { opacity: 0.72 },
        }}
      >
        <Iconify icon="carbon:edit" sx={{ mr: 1 }} />
        {t('Edit')}
      </Stack>

      <LoadingButton
        color="inherit"
        size="small"
        type="submit"
        variant="contained"
        onClick={submitHandler}
      >
        {t('Save')}
      </LoadingButton>

    </>
) : (
  <Stack
    direction="row"
    alignItems="center"
    onClick={() => document.getElementById('profile-image-upload').click()}
    sx={{
      typography: 'caption',
      cursor: 'pointer',
      '&:hover': { opacity: 0.72 },
    }}
  >
    <Iconify icon="carbon:edit" sx={{ mr: 1 }} />
    {t('Edit')}
  </Stack>
);


  const renderContentFix  = isProfileLoading ?  (

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
    <Stack spacing={2} sx={{ p: 3, pb: 2 }} >
      <Stack spacing={2} direction="row" alignItems="center">
        <Skeleton variant="circular" width={64} height={64} />
        <Stack direction="row" alignItems="center" spacing={1}>
          <Skeleton variant="rectangular" width={100} height={40} />
          <Skeleton variant="rectangular" width={100} height={40} />
        </Stack>
      </Stack>

      <Stack spacing={0.5}>
        <Skeleton variant="text" width={150} />
        <Skeleton variant="text" width={200} />
      </Stack>
    </Stack>

    <Divider sx={{ borderStyle: 'dashed' }} />

    <Stack sx={{ my: 1, px: 2 }}>
      {[1, 2, 3].map((index) => (
        <Skeleton key={index} variant="rectangular" height={44} sx={{ my: 1, borderRadius: 1 }} />
      ))}
    </Stack>

    <Divider sx={{ borderStyle: 'dashed' }} />

    <Stack sx={{ my: 1, px: 2 }}>
      <Skeleton variant="rectangular" height={44} sx={{ borderRadius: 1 }} />
    </Stack>
  </Stack>
  ) : (




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
      <Stack spacing={2} sx={{ p: 3, pb: 2 }} >
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar src={imageUrl || image} sx={{ width: 64, height: 64 }} />

          <Stack direction="row" alignItems="center" spacing={1}>
            <input
              type="file"
              accept="image/*"
              onChange={changeHandler}
              id="profile-image-upload"
              style={{ display: 'none' }}
            />


            {renderEditOrSaveButton}


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
            primary={t('Logout')}
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
          marginTop: '30px',
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
          {/* <Nav open={menuOpen.value} onClose={menuOpen.onFalse} /> */}

          {mdUp ? renderContentFix : <Box />}

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

function NavItem({ item, onClose  }) {
  const active = useActiveLink(item.path);
  const { t } = useTranslation();  // useTranslation hook for translations

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
