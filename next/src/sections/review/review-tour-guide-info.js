

import { useState, useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import useAuthDialog from 'src/hooks/use-authdialog';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import { fDate } from 'src/utils/format-time';
import LoginDialog from 'src/sections/auth/login-dialog';

// ----------------------------------------------------------------------

export default function ReviewTourGuideInfo({ seller }) {
  console.log('Seller:', seller); // Log the seller object

  const { requireAuth, loginDialogOpen, handleLoginDialogClose } = useAuthDialog();

  const {
    name,
    profile_image,
    created_at,
    about = '',
    quotes = '',
    ratingNumber = 0,
    totalReviews = 0,
    verified = false,
  } = seller;


  const handleChatClick = () => {
    requireAuth(() => {
      // Add the code to open the chat or navigate to the chat page
      console.log("Chat button clicked. User authenticated.");
    });
  };


  return (


      <>
          <Paper variant="outlined" sx={{ borderRadius: 2 }}>
            <Stack alignItems="center" sx={{ textAlign: 'center', p: 5 }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  verified ? (
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: 'background.default',
                      }}
                    >
                      <Iconify icon="carbon:checkmark-filled" sx={{ color: 'success.main' }} />
                    </Box>
                  ) : null
                }
              >
                <Avatar src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${profile_image}`} sx={{ width: 96, height: 96 }} />
              </Badge>

              <Stack spacing={1} sx={{ my: 2 }}>
                <Typography variant="h4">{name}</Typography>

                <Stack spacing={0.5} direction="row" alignItems="center">
                  <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />

                  <Box sx={{ typography: 'h6' }}>
                    {Number.isInteger(ratingNumber) ? `${ratingNumber}.0` : ratingNumber}
                  </Box>

                  <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
                    ({totalReviews} reviews)
                  </Box>
                </Stack>
              </Stack>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Joined on {created_at ? fDate(created_at) : 'N/A'}
              </Typography>

              <Stack direction="row" sx={{ my: 2.5 }}>
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

              <Typography variant="caption" paragraph sx={{ color: 'text.disabled' }}>
                {quotes}
              </Typography>

              <Button color="inherit" variant="outlined" size="large" onClick={handleChatClick}>
                Contact Seller
              </Button>
            </Stack>
          </Paper>

          <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />

      </>

  );
}

ReviewTourGuideInfo.propTypes = {
  seller: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profile_image: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    about: PropTypes.string,
    quotes: PropTypes.string,
    ratingNumber: PropTypes.number,
    totalReviews: PropTypes.number,
    verified: PropTypes.bool,
  }).isRequired,
};
