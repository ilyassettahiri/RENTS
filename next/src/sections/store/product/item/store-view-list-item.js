import { useState, useCallback, useEffect } from 'react';


import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/ar';

import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { capitalizeFirstLetter } from 'src/utils/format-time';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Image from 'src/components/image';
import useAuthDialog from 'src/hooks/use-authdialog';
import CrudService from 'src/services/cruds-service';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';
import LoginDialog from 'src/sections/auth/login-dialog';

import TextMaxLine from 'src/components/text-max-line';
import ProductPrice from '../../common/product-price';
import ProductRating from '../../common/product-rating';


dayjs.extend(relativeTime);



export default function StoreViewListItem({ product, favorites = [], onFavoriteToggle, ...other }) {




  const { i18n } = useTranslation();


  dayjs.locale(i18n.language);


  const formattedDuration = dayjs(new Date(product.attributes.created_at)).fromNow();




  const { id, category, url, city, jobtype, title } = product.attributes;

  const formatJobType = (jobtypee) => {
    if (!jobtypee) return ""; // Return an empty string if jobtype is null or undefined
    return jobtypee
      .toLowerCase()
      .normalize("NFD") // Normalize accents
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .trim()
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  };


  const type = category === 'services' || category === 'jobs'
    ? formatJobType(jobtype)
    : `${category}-for-rent`;

  const getHref = () => {
    if (category === 'services') {
      return `${paths.career.root}/${city}/${type}/${url}`;
    }
    if (category === 'jobs') {
      return `${paths.job.root}/${city}/${type}/${url}`;
    }
    return `${paths.travel.tour}/en/${city}/${category}/${type}/${url}`;
  };



  const isFavorite = favorites.some((favorite) => favorite.category === category && favorite.id === id);
  const [favorite, setFavorite] = useState(isFavorite);

  const { requireAuth, loginDialogOpen, handleLoginDialogClose } = useAuthDialog();


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



  useEffect(() => {
    setFavorite(isFavorite); // Ensure state is updated when favorites prop changes
  }, [isFavorite]);

  return (

    <>

        <Stack
          direction="row"
          sx={{
            position: 'relative',
            '&:hover .add-to-cart': {
              opacity: 1,
            },
          }}
          {...other}
        >



                <Checkbox
                    color="error"
                    checked={favorite}
                    onChange={handleChangeFavorite}
                    icon={<Iconify icon="carbon:favorite" />}
                    checkedIcon={<Iconify icon="carbon:favorite-filled" />}
                    sx={{ color: 'common.white', position: 'absolute', m: 1, top: 0, left: 0, zIndex: 9  }}
                  />




          <Box
            sx={{
              mr: 2,
              width: 200,
              flexShrink: 0,
              borderRadius: 1.5,
              bgcolor: 'background.neutral',
              overflow: 'hidden', // Ensure the carousel respects the borderRadius
            }}
          >
            <CarouselBasic1 data={product.attributes.images} category={category} title={title} url={url} city={city} type={type}/>
          </Box>

          <Stack spacing={1}>
            <Stack spacing={0.5}>


              <ProductPrice price={product.attributes.price} sx={{ typography: 'body2' }} />


              <Link component={RouterLink}

              href={getHref()}


              color="inherit">
                <TextMaxLine variant="h6" line={1}>

                  {capitalizeFirstLetter(product.attributes.title)}
                </TextMaxLine>
              </Link>
            </Stack>

            <ProductRating ratingNumber={product.attributes.averageRating} label={`${product.attributes.totalReviews} reviews`} />

            <Stack
                      direction="row"
                      alignItems="center"
                      sx={{ typography: 'body2', color: 'text.secondary' }}
                    >
                        <Iconify icon="carbon:time" width={13} sx={{ mr: 0.5 }} />


                          <Box sx={{ typography: 'body2' }}>
                          {formattedDuration}
                          </Box>




            </Stack>



          </Stack>
        </Stack>

        <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />

    </>

  );
}

StoreViewListItem.propTypes = {
  product: PropTypes.shape({
    attributes: PropTypes.shape({
      status: PropTypes.string,
      picture: PropTypes.string,
      category: PropTypes.string,
      title: PropTypes.string,
      averageRating: PropTypes.number,
      totalReviews: PropTypes.number,
      created_at: PropTypes.string,
      price: PropTypes.number,
      images: PropTypes.array.isRequired,
      id: PropTypes.number,
      city: PropTypes.string,
      jobtype: PropTypes.string.isRequired,

      type: PropTypes.string,
      url: PropTypes.string, // Added missing prop validation

    }),
  }),

  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func.isRequired,
};


StoreViewListItem.defaultProps = {
  favorites: [],
};


function CarouselBasic1({ data, category, title, url, city, type }) {
  const carousel = useCarousel({
    autoplay: false,
  });





  const getHref = () => {
    if (category === 'services') {
      return `${paths.career.root}/${city}/${type}/${url}`; // Correct URL for services category
    }
    if (category === 'jobs') {
      return `${paths.job.root}/${city}/${type}/${url}`; // Correct URL for jobs category
    }
    return `${paths.travel.tour}/en/${city}/${category}/${type}/${url}`; // Default URL for other categories
  };



  return (
    <>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {data.map((item, index) => (


            <Link
              key={index}
              href={getHref()}
              component={RouterLink}
            >
                  <Image
                    key={index}
                    alt={title}

                    src={`${process.env.NEXT_PUBLIC_IMAGE_LISTING_SMALL}${item.picturesmall}`}
                    ratio="1/1"
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

  city: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,


  url: PropTypes.string.isRequired,
};
