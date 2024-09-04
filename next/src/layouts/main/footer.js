import PropTypes from 'prop-types';
import { useContext } from 'react';

import { AuthContext } from 'src/context/AuthContextProvider';
import Box from '@mui/material/Box';

import Link from '@mui/material/Link';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Button, { buttonClasses } from '@mui/material/Button';
import { paths } from 'src/routes/paths';


import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';


import Logo from 'src/components/logo/logo';
import Iconify from 'src/components/iconify';

import { pageLinks, navConfig } from './config-navigation';

// ----------------------------------------------------------------------

const StyledAppStoreButton = styled(Button)(({ theme }) => ({
  flexShrink: 0,
  padding: '5px 12px',
  color: theme.palette.common.white,
  border: `solid 1px ${alpha(theme.palette.common.black, 0.24)}`,
  background: `linear-gradient(180deg, ${theme.palette.grey[900]} 0%, ${theme.palette.common.black} 100%)`,
  [`& .${buttonClasses.startIcon}`]: {
    marginLeft: 0,
  },
}));

// ----------------------------------------------------------------------

export default function Footer() {
  const mdUp = useResponsive('up', 'md');
  const { handleCategoryClick } = useContext(AuthContext);

  const pathname = usePathname();

  const mobileList = navConfig.find((i) => i.title === 'Pages')?.children || [];

  const desktopList = pageLinks.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  const renderLists = mdUp ? desktopList : mobileList;




  const mainFooter = (
    <>

      <Container maxWidth={false}
        sx={{
          overflow: 'hidden',
          py: { xs: 2, md: 4 },
          paddingLeft: { lg: '100px' },
          paddingRight: { lg: '100px' },
          bgcolor: 'black',
          color: 'white',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',

        }}
      >
        <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={4}>
            <Stack spacing={{ xs: 3, md: 5 }} alignItems={{ xs: 'center', md: 'flex-start' }}>









              <Stack spacing={1} alignItems="flex-start">

                <Typography variant="h6">Important Links</Typography>


                <Link variant="subtitle2" sx={{ color: 'text.secondary' }}

                href={paths.travel.contact}
                >
                  Contact Us
                </Link>


                  <Link variant="subtitle2" sx={{ color: 'text.secondary' }}

                  href={paths.support}
                  >
                    Help Center
                  </Link>


                  <Link variant="subtitle2" sx={{ color: 'text.secondary' }}

                  href={paths.travel.posts}
                  >
                    Blog
                  </Link>


                  <Link variant="subtitle2" sx={{ color: 'text.secondary' }}
                  href={paths.travel.privacy}
                  >
                    Privacy Policy
                  </Link>

                  <Link variant="subtitle2" sx={{ color: 'text.secondary' }}
                  href={paths.travel.termcondition}
                  >
                    Terms of Service
                  </Link>

                  <Link variant="subtitle2" sx={{ color: 'text.secondary' }}

                  href={paths.travel.about}
                  >
                    About
                  </Link>




              </Stack>



              <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
                <Typography variant="h6">Social</Typography>
                <Stack direction="row" alignItems="center">
                  <IconButton color="primary">
                    <Iconify icon="mdi:facebook" />
                  </IconButton>
                  <IconButton color="primary">
                    <Iconify icon="mdi:instagram" />
                  </IconButton>
                  <IconButton color="primary">
                    <Iconify icon="mdi:tiktok" />
                  </IconButton>
                  <IconButton color="primary">
                    <Iconify icon="mdi:twitter" />
                  </IconButton>
                  <IconButton color="primary">
                    <Iconify icon="mdi:linkedin" />
                  </IconButton>
                </Stack>
              </Stack>

              <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
                <Typography variant="h6">Apps</Typography>
                <AppStoreButton />
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={6}>
            {mdUp ? (
              <Masonry columns={3} spacing={2} defaultColumns={3} defaultSpacing={2}>
                {renderLists.map((list) => (
                  <ListDesktop key={list.subheader} list={list} />
                ))}
              </Masonry>
            ) : (
              <Stack spacing={1.5}>
                {renderLists.map((list) => (
                  <ListMobile key={list.subheader} list={list} />
                ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container maxWidth={false} sx={{
        paddingLeft: { lg: '100px' },
        paddingRight: { lg: '100px' },
        bgcolor: 'black',
        color: 'white',
        }}>
        <Stack

          justifyContent="center"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © 2024 RENTS . All rights reserved
          </Typography>


        </Stack>
      </Container>
    </>
  );

  return <footer>{mainFooter}</footer>;
}

// ----------------------------------------------------------------------
export function ListDesktop({ list }) {
  const { handleCategoryClick } = useContext(AuthContext);

  const handleClick = (category) => {
    handleCategoryClick(category);

  };

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="h6">{list.subheader}</Typography>
      {list.items?.map((link) => (
        <Typography
          key={link.title}
          variant="caption"
          onClick={() => handleClick(link.title)}
          sx={{
            color: 'text.secondary',
            cursor: 'pointer',
            '&:hover': {
              color: 'text.primary',
            },
          }}
        >
          {link.title}
        </Typography>
      ))}
    </Stack>
  );
}

ListDesktop.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }).isRequired,
};


ListDesktop.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

export function ListMobile({ list }) {
  const pathname = usePathname();

  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="subtitle2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {list.subheader}
        <Iconify
          width={16}
          icon={listExpand.value ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
                ...(pathname === `${link.path}/` && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

ListMobile.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

function AppStoreButton({ ...other }) {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={2} {...other}>
      <StyledAppStoreButton startIcon={<Iconify icon="ri:apple-fill" width={28} />}>
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download on the
          </Typography>

          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Apple Store
          </Typography>
        </Stack>
      </StyledAppStoreButton>

      <StyledAppStoreButton startIcon={<Iconify icon="logos:google-play-icon" width={28} />}>
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download from
          </Typography>

          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Google Play
          </Typography>
        </Stack>
      </StyledAppStoreButton>
    </Stack>
  );
}
