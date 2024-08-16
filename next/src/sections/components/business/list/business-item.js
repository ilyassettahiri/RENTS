


import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { formatDistanceToNow } from 'date-fns';

import useAuthDialog from 'src/hooks/use-authdialog';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';
import Popover from '@mui/material/Popover';
import CardActionArea from '@mui/material/CardActionArea';

import Image from 'src/components/image';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import LoginDialog from 'src/sections/auth/login-dialog';

// ----------------------------------------------------------------------




const StyledButton = styled((props) => (
  <CardActionArea >
    <Stack direction="row" alignItems="center" spacing={2} {...props} />
  </CardActionArea>
))(({ theme }) => ({
  ...theme.typography.subtitle2,
  padding: `${theme.spacing(0)} ${theme.spacing(0)}`,


}));



export default function BusinessItem({ business, vertical }) {



  const { attributes } = business;
  const { name,description,profile, city,phone,picture, created_at, category, url, } = attributes;


  const { requireAuth, loginDialogOpen, handleLoginDialogClose } = useAuthDialog();


  const [opencall, setOpencall] = useState(null);


  const formattedDuration = formatDistanceToNow(new Date(created_at), { addSuffix: true });

  const handleOpenCall = useCallback((event) => {
    setOpencall(event.currentTarget);
  }, []);

  const handleCloseCall = useCallback(() => {
    setOpencall(null);
  }, []);



  const handleChatClick = () => {
    requireAuth(() => {
      // Add the code to open the chat or navigate to the chat page
      console.log("Chat button clicked. User authenticated.");
    });
  };


  return (


      <>

        <Card
          sx={{
            display: { sm: 'flex' },
            '&:hover': {
              boxShadow: (theme) => theme.customShadows.z24,
            },
            ...(vertical && {
              flexDirection: 'column',
            }),
          }}
        >
          <Box sx={{ flexShrink: { sm: 0 } }}>
            <Image
              alt={name}
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${picture}`}


              sx={{
                height: 1,
                objectFit: 'cover',
                width: { sm: 240 },
                ...(vertical && {
                  width: { sm: 1 },
                }),
              }}
            />
          </Box>


            <Label
              color="warning"
              variant="filled"
              sx={{
                top: 12,
                left: 12,
                position: 'absolute',
                textTransform: 'lowerpercase',
              }}
            >
              <Iconify icon="carbon:location"  />



              {city}
            </Label>


          <Stack spacing={3} sx={{ p: 2 }}>
            <Stack
              spacing={{
                xs: 3,
                sm: vertical ? 3 : 1,
              }}
            >


              <Stack spacing={1}>
                <Link component={RouterLink}  color="inherit"

                    href={`${paths.eCommerce.stores}/${url}`}
                  >
                  <TextMaxLine variant="h6" line={1}>
                    {name}
                  </TextMaxLine>
                </Link>


              </Stack>
            </Stack>

            <Stack
              spacing={1.5}
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              divider={<Divider orientation="vertical" sx={{ height: 20, my: 'auto' }} />}
            >
              <Stack spacing={0.5} direction="row" alignItems="center">
                <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
                <Box sx={{ typography: 'h6' }}>
                  {Number.isInteger(5) ? `${5}.0` : 5}
                </Box>

                {10 && (
                  <Link variant="body2" sx={{ color: 'text.secondary' }}>
                    ({fShortenNumber(10)} reviews)
                  </Link>
                )}
              </Stack>

              <Stack direction="row" sx={{ typography: 'subtitle2' }}>
                Member since {formattedDuration}

              </Stack>
            </Stack>




            <Stack spacing={4} direction={{ xs: 'row', md: 'row' }} sx={{ py: 0 }}>




                <Box
                  sx={{
                    flexGrow:  1,
                    gap: 1,
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(1, 1fr)',
                      md: 'repeat(1, 1fr)',
                      lg: 'repeat(1, 1fr)',
                    },
                  }}
                >



                  <Stack spacing={1} direction="row" alignItems="center">
                    <Avatar
                      variant="rounded"
                      alt={NamedNodeMap}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${profile}`}
                      sx={{ width: 40, height: 40 }}
                    />

                    <Stack spacing={0}>
                        <Link variant="subtitle2" color="inherit" >
                        {name}
                        </Link>


                    </Stack>

                  </Stack>

                </Box>


                <Stack spacing={2} direction="row" alignItems="center" flexShrink={0}>

                  <StyledButton>

                    <Iconify icon="carbon:phone" width={24} onClick={handleOpenCall} color={opencall ? 'primary' : 'default'}/>
                  </StyledButton>


                  <StyledButton>

                    <Iconify icon="carbon:email" width={24}  onClick={() => window.open(`https://wa.me/${phone}`, '_blank')}/>
                  </StyledButton>



                  <StyledButton>

                    <Iconify icon="carbon:chat" width={24} onClick={handleChatClick}/>

                  </StyledButton>









                </Stack>







            </Stack>




            <Divider
              sx={{
                borderStyle: 'dashed',

                ...(vertical && {
                  display: 'block',
                }),
              }}
            />

            <Stack
              direction="row"
              flexWrap="wrap"
              alignItems="center"
              sx={{ color: 'text.disabled', '& > *:not(:last-child)': { mr: 2.5 } }}
            >
              <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
                <Iconify icon="carbon:time" sx={{ mr: 1 }} /> 8 hours
              </Stack>

              <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
                <Iconify icon="carbon:skill-level-advanced"

                  sx={{ mr: 1 }}
                />
                Beginner
              </Stack>
            </Stack>
          </Stack>

          <Popover
            open={!!opencall}
            onClose={handleCloseCall}
            anchorEl={opencall}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            slotProps={{
              paper: {
                sx: { width: 300,p: 2  },
              },
            }}
          >
                <Typography variant="subtitle2" >

                  Don&apos;t forget to mention the property reference when you call.

                </Typography>

              <Divider sx={{ borderStyle: 'dashed', my: 3 }} />

              <StyledButton>

                <Iconify icon="carbon:phone" width={24} />
                <Typography variant="subtitle2">

                  <Box component="span" sx={{ color: 'primary.main' }}>

                    {phone}
                  </Box>
                </Typography>
              </StyledButton>

          </Popover>

        </Card>
        <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />

      </>

  );
}

BusinessItem.propTypes = {
  business: PropTypes.shape({
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      profile: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,

      picture: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  vertical: PropTypes.bool,
};
