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
          py: { xs: 8, md: 10 },
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
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Stack alignItems="flex-start" spacing={3}>


              <Box >
                {/* Directly use the SVG here */}
                <Link component={RouterLink} href="/" aria-label="go to homepage">
                  <Box
                    sx={{
                      width: 80,
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
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  The starting point for your next project based on easy-to-customize Material-UI ©
                  helps you build apps faster and better.
                </Typography>
              </Stack>





              <Stack spacing={2}>
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

              <Stack spacing={2}>
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
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © 2024. All rights reserved
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">

            <Link variant="caption" sx={{ color: 'text.secondary' }}
             href={paths.travel.privacy}
            >
              Privacy Policy
            </Link>

            <Link variant="caption" sx={{ color: 'text.secondary' }}
            href={paths.travel.termcondition}
            >
              Terms of Service
            </Link>




            <Link variant="caption" sx={{ color: 'text.secondary' }}

            href={paths.support}
            >
              Help Center
            </Link>


            <Link variant="caption" sx={{ color: 'text.secondary' }}

            href={paths.travel.posts}
            >
              Blog
            </Link>


            <Link variant="caption" sx={{ color: 'text.secondary' }}

            href={paths.travel.about}
            >
              About
            </Link>


            <Link variant="caption" sx={{ color: 'text.secondary' }}

            href={paths.travel.contact}
            >
              Contact Us
            </Link>


          </Stack>
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="subtitle2">{list.subheader}</Typography>
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
