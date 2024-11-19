'use client';


import { useState, useCallback, useEffect , useMemo} from 'react';

import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/ar';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import CrudService from 'src/services/cruds-service';
import { capitalizeFirstLetter } from 'src/utils/format-time';

import { paths as getPaths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';
import useAuthDialog from 'src/hooks/use-authdialog';
import LoginDialog from 'src/sections/auth/login-dialog';

import TextMaxLine from 'src/components/text-max-line';
import ProductPrice from '../../common/product-price';
import ProductRating from '../../common/product-rating';


dayjs.extend(relativeTime);


export default function StoreViewGridItem({ product, sx, favorites = [], onFavoriteToggle, ...other }) {

  const { i18n } = useTranslation();
  const paths = useMemo(() => getPaths(i18n.language), [i18n.language]);


  dayjs.locale(i18n.language);


  const formattedDuration = dayjs(new Date(product.attributes.created_at)).fromNow();




  const { id, category, url, city, jobtype, title  } = product.attributes;



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
    return `${paths.travel.tour}/${city}/${category}/${type}/${url}`;
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
        <Card sx={{ position: 'relative', }}>

            <Label color="error" sx={{ position: 'absolute',
              m: 1, top: 0, left: 0, zIndex: 9 ,
              typography: 'body2',
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            }}

            >
              <ProductPrice price={product.attributes.price} sx={{ typography: 'body2' }} />


            </Label>

                  <Checkbox
                    color="error"
                    checked={favorite}
                    onChange={handleChangeFavorite}
                    icon={<Iconify icon="carbon:favorite" />}
                    checkedIcon={<Iconify icon="carbon:favorite-filled" />}
                    sx={{ color: 'common.white', position: 'absolute', m: 1, top: 0, right: 0, zIndex: 9  }}
                  />


          <Box sx={{ position: 'relative',  }}>


            <CarouselBasic1 data={product.attributes.images} category={category} title={title} url={url} city={city} type={type} paths={paths}/>

          </Box>

          <Stack spacing={0.5} sx={{ p: 2 }}>


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



            <Link
              component={RouterLink}
              href={getHref()}

              color="inherit"
            >
              <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>

                {capitalizeFirstLetter(product.attributes.title)}
              </TextMaxLine>
            </Link>


            <ProductRating ratingNumber={product.attributes.averageRating} label={`${product.attributes.totalReviews} reviews`} />
          </Stack>
        </Card>
        <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />

    </>
  );
}

StoreViewGridItem.propTypes = {
  product: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string,
      averageRating: PropTypes.number,
      totalReviews: PropTypes.number,
      picture: PropTypes.string,
      category: PropTypes.string,
      created_at: PropTypes.string,
      images: PropTypes.array.isRequired,
      id: PropTypes.number,
      city: PropTypes.string,
      jobtype: PropTypes.string.isRequired,

      type: PropTypes.string,

      price: PropTypes.number,
      status: PropTypes.string,
      url: PropTypes.string, // Added missing prop validation
    }),
  }).isRequired,
  sx: PropTypes.object,

  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func.isRequired,
};



StoreViewGridItem.defaultProps = {
  favorites: [],
};

function CarouselBasic1({ data, category, title, url, city, type, paths }) {
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
    return `${paths.travel.tour}/${city}/${category}/${type}/${url}`; // Default URL for other categories
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
  title: PropTypes.string.isRequired,
  paths: PropTypes.object.isRequired,

  url: PropTypes.string.isRequired,
};

