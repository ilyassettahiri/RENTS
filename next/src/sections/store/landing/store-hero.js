/* eslint-disable import/no-named-as-default, class-methods-use-this */


import { useState, useCallback } from 'react';


import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { bgGradient } from 'src/theme/css';
import AppBar from "@mui/material/AppBar";
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { fShortenNumber } from 'src/utils/format-number';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function StoreHero({ picture, profile, name, created, average_rating, total_reviews }) {
  const theme = useTheme();
  const favorited = false;

  const [favorite, setFavorite] = useState(favorited);
  const [open, setOpen] = useState(null);

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleChangeFavorite = useCallback((event) => {
    setFavorite(event.target.checked);
  }, []);


  return (
    <Container

      sx={{
        pt: { xs: 5, md: 8 },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0),
            imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${picture}`,
          }),
          borderRadius: 3,
          overflow: 'hidden',
          height: '400px',
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Center the card horizontally
          position: "relative",
        }}
      />

      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.8),
          boxShadow: (theme) => theme.shadows[3],
          bottom: -60, // Adjust as needed to place it correctly
          left: '50%', // Center horizontally
          transform: 'translateX(-50%)', // Center horizontally
          position: "relative",
          mt: -12,
          marginRight: { lg: '50px' },
          py: 2,
          px: 2,

        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${profile}`}
              alt="profile-image"
              variant="rounded"
              sx={{ width: 64, height: 64, boxShadow: 1 }}
            />
          </Grid>
          <Grid item>
            <Box height="100%" mt={0.5} lineHeight={1}>


                <Stack spacing={0.5} direction="row" alignItems="center">
                    <Typography variant="h5" fontWeight="medium">
                      {name}

                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      (2343 followers)
                    </Typography>
                </Stack>

                <Stack spacing={0.5} direction="row" alignItems="center">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }} fontWeight="medium">
                        Member Since: {created} 2019

                      </Typography>



                      <Iconify icon="carbon:location" sx={{ mr: 0.5 }} /> Marrakech






                      <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
                      <Box sx={{ typography: 'h6' }}>
                        {Number.isInteger(average_rating) ? `${average_rating}.0` : average_rating}
                      </Box>
                      <Link variant="body2" sx={{ color: 'text.secondary' }}>
                        ({fShortenNumber(total_reviews)} reviews)
                      </Link>

                </Stack>


            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>



                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>


                      <Stack direction="row" spacing={3}  flexShrink={0}>

                      <IconButton color="default">
                        <Iconify icon="carbon:chat" />
                      </IconButton>
                      <IconButton color="default">
                        <Iconify icon="carbon:email" />
                      </IconButton>
                      <IconButton color="default">
                        <Iconify icon="carbon:phone" />
                      </IconButton>
                        <IconButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
                          <Iconify icon="carbon:share" />
                        </IconButton>

                        <Checkbox
                          color="error"
                          checked={favorite}
                          onChange={handleChangeFavorite}
                          icon={<Iconify icon="carbon:favorite" />}
                          checkedIcon={<Iconify icon="carbon:favorite-filled" />}
                        />
                      </Stack>


                  </Stack>



          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
