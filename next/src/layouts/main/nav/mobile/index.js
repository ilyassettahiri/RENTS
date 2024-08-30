import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { RouterLink } from 'src/routes/components';

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import Logo from 'src/components/logo/logo';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import NavList from './nav-list';
import { NAV } from '../../../config-layout';

// ----------------------------------------------------------------------

export default function NavMobile({ data }) {
  const pathname = usePathname();

  const mobileOpen = useBoolean();

  useEffect(() => {
    if (mobileOpen.value) {
      mobileOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton onClick={mobileOpen.onTrue} sx={{  color: 'inherit' }}>
        <Iconify icon="carbon:menu" />
      </IconButton>

      <Drawer
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_VERTICAL,
          },
        }}
      >
        <Scrollbar>



          <Box sx={{ mx: 2.5, my: 2 }}>
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

          <List component="nav" disablePadding>
            {data.map((list) => (
              <NavList key={list.title} data={list} onItemClick={mobileOpen.onFalse}/>
            ))}
          </List>


          <Stack spacing={1.5} sx={{ p: 3 }}>
            <Button
              fullWidth
              variant="contained"
              color="inherit"
              href={paths.createlisting}
              target="_blank"
              rel="noopener"
            >
              Create Listing
            </Button>
          </Stack>

        </Scrollbar>
      </Drawer>
    </>
  );
}

NavMobile.propTypes = {
  data: PropTypes.array,
};
