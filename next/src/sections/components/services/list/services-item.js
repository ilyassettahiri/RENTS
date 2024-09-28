import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/ar';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import CardActionArea from '@mui/material/CardActionArea';
import Popover from '@mui/material/Popover';
import useAuthDialog from 'src/hooks/use-authdialog';
import CrudService from 'src/services/cruds-service';
import { useRouter } from 'src/routes/hooks';

import Typography from '@mui/material/Typography';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { fDate,capitalizeFirstLetter } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import Grid from '@mui/material/Unstable_Grid2';
import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';
import LoginDialog from 'src/sections/auth/login-dialog';


// ----------------------------------------------------------------------
dayjs.extend(relativeTime);


const StyledButton = styled((props) => (
  <CardActionArea >
    <Stack direction="row" alignItems="center" spacing={2} {...props} />
  </CardActionArea>
))(({ theme }) => ({
  ...theme.typography.subtitle2,
  padding: `${theme.spacing(0)} ${theme.spacing(0)}`,


}));


export default function ServiceItem({ job, favorites = [], onFavoriteToggle }) {
  console.log('Favorites in listing list ', favorites); // Ensure this is logged correctly and not empty

  const { attributes } = job;

  const { title, city,phone, averageRating, price,seller, created_at, category, url, id, images } = attributes;

  const router = useRouter();


  const { i18n } = useTranslation();


  dayjs.locale(i18n.language);


  const formattedDuration = dayjs(new Date(created_at)).fromNow();



  const [opencall, setOpencall] = useState(null);

  const { requireAuth, loginDialogOpen, handleLoginDialogClose } = useAuthDialog();


  const handleOpenCall = useCallback((event) => {
    setOpencall(event.currentTarget);
  }, []);

  const handleCloseCall = useCallback(() => {
    setOpencall(null);
  }, []);



  const isFavorite = favorites.some((favorite) => favorite.category === category && favorite.id === id);
  const [favorite, setFavorite] = useState(isFavorite);


  const handleChangeFavorite = useCallback(() => {
    requireAuth(async () => {
      try {
        const response = await CrudService.createFavorite(category, url, id);

        console.log('Response Favorite:', response.favorite);

        setFavorite(response.favorite);
        onFavoriteToggle(id, response.favorite);
      } catch (error) {
        console.error('Failed to update favorite:', error);
      }
    });
  }, [requireAuth, category, url, id, onFavoriteToggle]);


  const handleChatClick = useCallback(() => {
    requireAuth(() => {
      router.push(`${paths.eCommerce.chat}?userID=${seller.id}`);
    });
  }, [requireAuth, seller.id, router]);




  useEffect(() => {
    setFavorite(isFavorite); // Ensure state is updated when favorites prop changes
  }, [isFavorite]);

  return (

    <>
        <Card
          sx={{
            '&:hover': {
              boxShadow: (theme) => theme.customShadows.z24,
            },
          }}
        >
          {/* Carousel of Images */}


          <Box sx={{ position: 'relative' }}>
            <CarouselBasic1 data={images} category={category} url={url} />

            {/* Price and Favorite at the Top */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                pt: 1.5,
                pl: 2,
                pr: 1.5,
                top: 0,
                width: 1,
                zIndex: 9,
                position: 'absolute',
              }}
            >


              <Stack/>

              <Checkbox
                color="error"
                checked={favorite}
                onChange={handleChangeFavorite}
                icon={<Iconify icon="carbon:favorite" />}
                checkedIcon={<Iconify icon="carbon:favorite-filled" />}
                sx={{ color: 'common.white' }}
              />
            </Stack>


            {/* Duration at the Bottom */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                pb: 1.5,
                pl: 2,
                pr: 1.5,
                bottom: 0,
                width: 1,
                zIndex: 9,
                position: 'absolute',
              }}
            >
              <Stack
                spacing={0.5}
                direction="row"
                sx={{
                  px: 1,
                  borderRadius: 0.75,
                  typography: 'body2',
                  bgcolor: 'text.primary',
                  color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                }}
              >
                <Iconify icon="carbon:time" sx={{ mr: 0.2, mt: 0.4 }} width={14} />


                {formattedDuration}

              </Stack>
            </Stack>


          </Box>

          <Stack sx={{ px: 1, py: 1 }}>







              <Stack spacing={4} direction={{ xs: 'row', md: 'row' }}>




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
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${seller.profile_image}`}
                        sx={{ width: 35, height: 35 }}
                      />

                      <Stack spacing={0}>
                          <Link variant="subtitle2" color="inherit" >

                          {capitalizeFirstLetter(seller.name.split(' ')[0])}
                          </Link>



                            <Stack
                              direction="row"
                              alignItems="center"
                              sx={{ typography: 'body2', color: 'text.secondary' }}
                            >
                                <Iconify icon="carbon:location" width={13} sx={{ mr: 0.3 }} />


                                  <Box sx={{ typography: 'caption' }}>
                                  {capitalizeFirstLetter(city)}
                                  </Box>



                            </Stack>


                      </Stack>

                    </Stack>

                  </Box>




                  <Stack spacing={2} direction="row" alignItems="center" flexShrink={0}>

                    <StyledButton>

                      <Iconify icon="carbon:phone" width={21} onClick={handleOpenCall} color={opencall ? 'primary' : 'default'}/>
                    </StyledButton>


                    <StyledButton>

                      <Iconify icon="mdi:whatsapp" width={21}  onClick={() => window.open(`https://wa.me/${phone}`, '_blank')}/>
                    </StyledButton>



                    <StyledButton>

                      <Iconify icon="carbon:chat" width={21} onClick={handleChatClick}/>

                    </StyledButton>









                  </Stack>







              </Stack>






          </Stack>




          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"

            sx={{ px: 1,my:1 }}

          >
                <Stack  >



                  <Link
                    component={RouterLink}
                    href={`${paths.career.job}/${url}`}
                    color="inherit"
                  >
                    <TextMaxLine variant="h6" line={1}>

                      {capitalizeFirstLetter(title)}
                    </TextMaxLine>
                  </Link>
                </Stack>

                <Stack  direction={{ xs: 'column-reverse', md: 'row' }} >





                    <Stack direction="row" alignItems="center" justifyContent="space-between" >

                        <Stack spacing={0.5} direction="row" alignItems="center">
                          <Iconify width={14} icon="carbon:star-filled" sx={{ color: 'black' }} />

                          <Box sx={{ typography: 'subtitle2' }}>
                          {averageRating ? `${parseFloat(averageRating).toFixed(1)}` : '5.0'}
                          </Box>


                        </Stack>

                    </Stack>


                </Stack>

          </Stack>





          <Divider sx={{ borderStyle: 'dashed', my: 2 }} />



          <Grid
            container
            spacing={1.5}
            sx={{
              p: 1,
              pt: 0,
              typography: 'body2',
              color: 'text.secondary',
              textTransform: 'capitalize',
            }}
          >
            <Grid xs={6}>
              <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
                <Iconify icon="carbon:increase-level" sx={{ mr: 1 }} />
                1 year exp
              </Stack>
            </Grid>

            <Grid xs={6}>
              <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
                <Iconify icon="carbon:time" sx={{ mr: 1 }} />
                Full Time
              </Stack>
            </Grid>

            <Grid xs={6}>
              <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
                <Iconify icon="carbon:money" sx={{ mr: 1 }} />
                {typeof price === 'number' ? fCurrency(price) : price}
              </Stack>
            </Grid>

            <Grid xs={6}>
              <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
                <Iconify icon="carbon:user" sx={{ mr: 1 }} />
                Manager
              </Stack>
            </Grid>
          </Grid>



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

ServiceItem.propTypes = {
  job: PropTypes.shape({
    attributes: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      city: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      averageRating: PropTypes.number.isRequired,

      images: PropTypes.array.isRequired,
      seller: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,

        profile_image: PropTypes.string.isRequired,
      }).isRequired,
      created_at: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func.isRequired,
};

ServiceItem.defaultProps = {
  favorites: [],
};

// CarouselBasic1 Component

function CarouselBasic1({ data, category, url }) {
  const carousel = useCarousel({
    autoplay: false,
  });

  return (
    <>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {data.map((item, index) => (


            <Link
              key={index}
              href={`${paths.career.job}/${url}`}
              component={RouterLink}
            >

                <Image
                  key={index}
                  alt={`Image ${index + 1}`}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_LISTING_SMALL}${item.picturesmall}`}
                  ratio="6/4"
                />

            </Link>


        ))}
      </Carousel>

      <Box sx={{ position: 'relative', zIndex: 999 }}>  {/* Added z-index 999 here */}
        <CarouselArrowIndex
          index={carousel.currentIndex}
          total={data.length}
          onNext={carousel.onNext}
          onPrev={carousel.onPrev}
        />
      </Box>
    </>
  );
}

CarouselBasic1.propTypes = {
  data: PropTypes.array.isRequired,

  category: PropTypes.string.isRequired,

  url: PropTypes.string.isRequired,
};
