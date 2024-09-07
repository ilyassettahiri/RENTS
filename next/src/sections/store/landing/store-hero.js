'use client';

import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha, useTheme, styled } from '@mui/material/styles';
import Card from "@mui/material/Card";
import { format } from 'date-fns';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import CardActionArea from '@mui/material/CardActionArea';
import { capitalizeFirstLetter } from 'src/utils/format-time';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';

import useAuthDialog from 'src/hooks/use-authdialog';
import CrudService from 'src/services/cruds-service';

import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { bgGradient } from 'src/theme/css';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';

import { fShortenNumber } from 'src/utils/format-number';
import Iconify from 'src/components/iconify';
import LoginDialog from 'src/sections/auth/login-dialog';

// ----------------------------------------------------------------------

// Define the specific social media icons
const socialMediaIcons = [
  { label: 'Facebook', icon: 'eva:facebook-fill', color: '#3b5998' },
  { label: 'Instagram', icon: 'ant-design:instagram-filled', color: '#E4405F' },
  { label: 'TikTok', icon: 'cib:tiktok', color: '#000000' },
  { label: 'Twitter', icon: 'eva:twitter-fill', color: '#1DA1F2' },
  { label: 'LinkedIn', icon: 'eva:linkedin-fill', color: '#0077B5' },
];

const StyledButton = styled((props) => (
  <CardActionArea >
    <Stack direction="row" alignItems="center" spacing={2} {...props} />
  </CardActionArea>
))(({ theme }) => ({
  ...theme.typography.subtitle2,
  padding: `${theme.spacing(0)} ${theme.spacing(0)}`,


}));




export default function StoreHero({ StoreData,  favorites = [], onFavoriteToggle }) {
  const { t } = useTranslation();


  const { attributes } = StoreData;
  const { name,seller,id, city,phone,zip, average_rating ,address,picture, created_at, category, url, total_reviews, profile } = attributes;

  const year = format(new Date(created_at), 'yyyy');

  const router = useRouter();

  const isFavorite = favorites.includes(id);
  const [favorite, setFavorite] = useState(isFavorite);
  const [opencall, setOpencall] = useState(null);

  const { requireAuth, loginDialogOpen, handleLoginDialogClose } = useAuthDialog();


  const handleOpenCall = useCallback((event) => {
    setOpencall(event.currentTarget);
  }, []);

  const handleCloseCall = useCallback(() => {
    setOpencall(null);
  }, []);


  const [openmap, setOpenmap] = useState(null);


  const handleOpenMap = useCallback((event) => {
    setOpenmap(event.currentTarget);
  }, []);

  const handleCloseMap = useCallback(() => {
    setOpenmap(null);
  }, []);



  const handleChatClick = useCallback(() => {
    requireAuth(() => {
      router.push(`${paths.eCommerce.chat}?userID=${seller.id}`);
    });
  }, [requireAuth, seller.id, router]);





  const theme = useTheme();

  const [open, setOpen] = useState(null);

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);


  const handleChangeFavorite = useCallback(() => {
    requireAuth(async () => {
      try {
        const response = await CrudService.createFavoriteStore( url, id);

        console.log('Response Favorite:', response.favorite);

        setFavorite(response.favorite);
        onFavoriteToggle(id, response.favorite);
      } catch (error) {
        console.error('Failed to update favorite:', error);
      }
    });
  }, [requireAuth, url, id, onFavoriteToggle]);




  useEffect(() => {
    setFavorite(isFavorite); // Ensure state is updated when favorites prop changes
  }, [isFavorite]);


  return (
    <>

          <Container

            maxWidth={false}

            sx={{
              pt: { xs: 5, md: 3 },
              mb: {  md: -4 },

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
                display: { xs: 'none', sm: 'flex' }, // Hide on xs, show on sm and larger

                alignItems: "center",
                justifyContent: "center", // Center the card horizontally
                position: "relative",
              }}
            />

            <Card
              sx={{
                backdropFilter: `saturate(200%) blur(30px)`,
                backgroundColor: (themeVar) => alpha(themeVar.palette.background.paper, 0.8), // Renamed theme to themeVar
                boxShadow: (themeVar) => themeVar.shadows[3], // Renamed theme to themeVar
                bottom: -60, // Adjust as needed to place it correctly
                left: '50%', // Center horizontally
                transform: 'translateX(-50%)', // Center horizontally
                position: "relative",
                mt: -12,
                marginRight: { xs: -5, lg: '50px' },
                py: 2,
                px: 2,
              }}
            >



                <Stack spacing={4} direction={{ xs: 'column', md: 'row' }} >




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
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${profile}`}
                            alt="profile-image"
                            variant="rounded"
                            sx={{ width: 64, height: 64, boxShadow: 1 }}
                          />

                        <Stack spacing={0.8}>

                            <Stack
                              spacing={0.5}
                              direction="row"
                              alignItems="center"
                              sx={{ typography: 'body2', color: 'text.main' }}
                            >
                                <Link variant="h5" color="inherit" >

                                {capitalizeFirstLetter(name)}
                                </Link>
                                <Iconify icon="carbon:star-filled" sx={{ ml:1, color: 'warning.main' }} />
                                <Box sx={{ typography: 'h6' }}>
                                  {Number.isInteger(average_rating) ? `${average_rating}.0` : average_rating}
                                </Box>
                                <Link variant="body2" sx={{ color: 'text.secondary' }}>
                                  ({fShortenNumber(total_reviews)} {t('Reviews')})
                                </Link>

                            </Stack>


                          <Stack
                            spacing={0.5}
                            direction="row"
                            alignItems="center"
                            sx={{ typography: 'body2', color: 'text.secondary' }}
                          >



                                <Box sx={{ typography: 'body2' }}>
                                {t('Membersince')} {year}

                                </Box>

                                <Iconify icon="carbon:location" sx={{  ml:1 }}/>

                                <Box sx={{ typography: 'body2' }}>


                                  {capitalizeFirstLetter(city)}
                                </Box>



                          </Stack>
                        </Stack>

                      </Stack>

                    </Box>


                    <Stack spacing={3} direction="row" alignItems="center" flexShrink={0}>

                      <StyledButton>

                        <Iconify icon="carbon:phone" width={22} onClick={handleOpenCall} color={opencall ? 'primary' : 'default'}/>
                      </StyledButton>


                      <StyledButton>

                        <Iconify icon="mdi:whatsapp" width={22}  onClick={() => window.open(`https://wa.me/${phone}`, '_blank')}/>
                      </StyledButton>



                      <StyledButton>

                        <Iconify icon="carbon:chat" width={22} onClick={handleChatClick}/>

                      </StyledButton>


                      <StyledButton>

                        <Iconify icon="carbon:map" width={22} onClick={handleOpenMap} color={openmap ? 'primary' : 'default'}/>

                      </StyledButton>



                      <StyledButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
                        <Iconify icon="carbon:share" width={22}/>
                      </StyledButton>

                      <Checkbox
                        color="error"
                        checked={favorite}
                        onChange={handleChangeFavorite}
                        icon={<Iconify icon="carbon:favorite" />}
                        checkedIcon={<Iconify icon="carbon:favorite-filled" />}
                      />





                    </Stack>







                </Stack>




            </Card>


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


                  <Iconify icon="carbon:phone" width={24} />
                  <Typography variant="subtitle2">

                    <Box component="span" sx={{ color: 'primary.main' }}>

                      {phone}
                    </Box>
                  </Typography>

            </Popover>




            <Popover
              open={!!openmap}
              onClose={handleCloseMap}
              anchorEl={openmap}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              slotProps={{
                paper: {
                  sx: { width: 300,p: 2  },
                },
              }}
            >
                  <Typography variant="subtitle2" >

                    Seller Address.

                  </Typography>

                <Divider sx={{ borderStyle: 'dashed', my: 3 }} />



                  <Typography variant="subtitle2"> { address} </Typography>

                  <Typography variant="subtitle2"> { city} </Typography>

                  <Typography variant="subtitle2"> { zip} </Typography>



            </Popover>



            <Popover
              open={!!open}
              onClose={handleClose}
              anchorEl={open}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              slotProps={{
                paper: {
                  sx: { width: 220 },
                },
              }}
            >
              {socialMediaIcons.map((social) => (
                <MenuItem key={social.label} onClick={handleClose}>
                  <Iconify icon={social.icon} width={24} sx={{ mr: 1, color: social.color }} />
                  Share via {social.label}
                </MenuItem>
              ))}
            </Popover>


          </Container>

          <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />

    </>

  );
}


StoreHero.propTypes = {
  StoreData: PropTypes.shape({
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      average_rating: PropTypes.number.isRequired,
      picture: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      profile: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,

      seller: PropTypes.array.isRequired,

      category: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      total_reviews: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,

  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func.isRequired,
};
StoreHero.defaultProps = {
  favorites: [],
};
