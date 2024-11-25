'use client';


import { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import { capitalizeFirstLetter } from 'src/utils/format-time';
import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/ar';
import useAuthDialog from 'src/hooks/use-authdialog';
import { useRouter } from 'src/routes/hooks';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import CardActionArea from '@mui/material/CardActionArea';

import { paths as getPaths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { fCurrency } from 'src/utils/format-number';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import ProductPrice from 'src/sections/store/common/product-price';

import TextMaxLine from 'src/components/text-max-line';
import CrudService from 'src/services/cruds-service';
import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';
import LoginDialog from 'src/sections/auth/login-dialog';

dayjs.extend(relativeTime);

const StyledButton = styled((props) => (
  <CardActionArea >
    <Stack direction="row" alignItems="center" spacing={2} {...props} />
  </CardActionArea>
))(({ theme }) => ({
  ...theme.typography.subtitle2,
  padding: `${theme.spacing(0)} ${theme.spacing(0)}`,


}));



export default function ListingsItem({ tour, favorites = [], onFavoriteToggle }) {
  const { attributes } = tour;
  const { title, city,phone,per, price,seller,averageRating, created_at, category, url, id, images } = attributes;

  const { i18n } = useTranslation();
  const paths = useMemo(() => getPaths(i18n.language), [i18n.language]);



  dayjs.locale(i18n.language);


  const formattedDuration = dayjs(new Date(created_at)).fromNow();

  const type = `${category}-for-rent`;


  const [opencall, setOpencall] = useState(null);


  const isFavorite = favorites.some((favorite) => favorite.category === category && favorite.id === id);
  const [favorite, setFavorite] = useState(isFavorite);

  const { requireAuth, loginDialogOpen, handleLoginDialogClose } = useAuthDialog();
  const router = useRouter();


  const handleOpenCall = useCallback((event) => {
    setOpencall(event.currentTarget);
  }, []);

  const handleCloseCall = useCallback(() => {
    setOpencall(null);
  }, []);


  const handleChangeFavorite = useCallback(() => {
    requireAuth(async () => {
      try {
        const response = await CrudService.createFavorite(category, url, id);
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
  }, [requireAuth, seller.id, router, paths.eCommerce.chat]);



  useEffect(() => {
    setFavorite(isFavorite); // Ensure state is updated when favorites prop changes
  }, [isFavorite]);

  return (
      <>
        <Card sx={{ position: 'relative' }}>
          {/* Carousel of Images */}
          <Box sx={{ position: 'relative' }}>
            <CarouselBasic1 data={images} category={category} title={title} url={url} city={city} type={type} paths={paths}/>

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

                  <ProductPrice

                  price={price}

                  per={per}
                  sx={{
                    px: 1,
                    borderRadius: 0.75,
                    typography: 'subtitle2',
                    bgcolor: 'text.primary',
                    color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                  }}

                  />



              <Checkbox
                color="error"
                checked={favorite}
                onChange={handleChangeFavorite}
                icon={<Iconify icon="carbon:favorite" />}
                checkedIcon={<Iconify icon="carbon:favorite-filled" />}
                sx={{ color: 'common.white' }}
              />
            </Stack>

            {/* City and Duration at the Bottom */}
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
                <Iconify icon="carbon:time" sx={{ mr: 0.2, mt: 0.5 }} width={14} /> {formattedDuration}
            </Stack>

            </Stack>
          </Box>



          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"

            sx={{ px: 1,my:3 }}

          >
                <Stack  >



                  <Link
                    component={RouterLink}
                    href={`${paths.travel.tour}/${city}/${category}/${type}/${url}`}
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












          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* Seller */}

          <Stack spacing={4} direction={{ xs: 'row', md: 'row' }} sx={{ py: 2, px: 1 }}>




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
                    alt={title}


                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${seller.profile_image}`}

                    sx={{ width: 40, height: 40 }}
                  />

                  <Stack spacing={0}>





                      <TextMaxLine variant="subtitle2" line={1}>

                        {capitalizeFirstLetter(seller.name)}
                      </TextMaxLine>



                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{ typography: 'body2', color: 'text.secondary' }}
                    >
                        <Iconify icon="carbon:location" width={13} sx={{ mr: 0.3 }} />


                          <Box sx={{ typography: 'caption' }}>
                           <TextMaxLine variant="caption" line={1}>

                            {capitalizeFirstLetter(city)}
                            </TextMaxLine>
                          </Box>



                    </Stack>
                  </Stack>

                </Stack>

              </Box>


              <Stack spacing={1.8} direction="row" alignItems="center" flexShrink={0}>

                <StyledButton>

                  <Iconify icon="carbon:phone" width={22} onClick={handleOpenCall} color={opencall ? 'primary' : 'default'}/>
                </StyledButton>


                <StyledButton>

                  <Iconify icon="mdi:whatsapp" width={22}  onClick={() => window.open(`https://wa.me/${phone}`, '_blank')}/>
                </StyledButton>



                <StyledButton>

                  <Iconify icon="carbon:chat" width={22} onClick={handleChatClick}/>

                </StyledButton>









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

                    <a href={`tel:${phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {phone}
                    </a>
                  </Box>
                </Typography>
              </StyledButton>

          </Popover>

        </Card>

        <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />
      </>
  );
}

ListingsItem.propTypes = {
  tour: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      phone: PropTypes.string.isRequired,
      averageRating: PropTypes.number.isRequired,
      per: PropTypes.string.isRequired,

      created_at: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired,
      seller: PropTypes.array.isRequired,

    }).isRequired,
  }).isRequired,
  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func.isRequired,
};

ListingsItem.defaultProps = {
  favorites: [],
};

// CarouselBasic1 Component

function CarouselBasic1({ data, category,title, url, city, type, paths }) {
  const carousel = useCarousel({
    autoplay: false,
  });


  return (
    <>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>


        {data.map((item, index) => (

            <Link
              key={index}
              href={`${paths.travel.tour}/${city}/${category}/${type}/${url}`}
              component={RouterLink}
            >

                <Image
                  key={index}

                  alt={`${title} - ${category} for rent on rents.ma`}

                  src={`${process.env.NEXT_PUBLIC_IMAGE_LISTING_SMALL}${item.picturesmall}`}
                  ratio="4/3"
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
  city: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  paths: PropTypes.object.isRequired,


};
