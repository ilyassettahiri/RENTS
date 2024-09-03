import { useState, useCallback, useEffect } from 'react';

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
import { formatDistanceToNow } from 'date-fns';
import useAuthDialog from 'src/hooks/use-authdialog';
import CrudService from 'src/services/cruds-service';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';
import LoginDialog from 'src/sections/auth/login-dialog';

import TextMaxLine from 'src/components/text-max-line';
import ProductPrice from '../../common/product-price';
import ProductRating from '../../common/product-rating';



export default function StoreViewListItem({ product, favorites = [], onFavoriteToggle, ...other }) {

  const formattedDuration = formatDistanceToNow(new Date(product.attributes.created_at), { addSuffix: true });
  const { id, category, url } = product.attributes;


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


          <Fab
            component={RouterLink}
            href={paths.eCommerce.product}
            className="add-to-cart"
            color="primary"
            size="small"
            sx={{
              right: 8,
              zIndex: 9,
              top: 8,
              opacity: 0,
              position: 'absolute',
              transition: (theme) =>
                theme.transitions.create('opacity', {
                  easing: theme.transitions.easing.easeIn,
                  duration: theme.transitions.duration.shortest,
                }),
            }}
          >
            <Iconify icon="carbon:shopping-cart-plus" />
          </Fab>

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
            <CarouselBasic1 data={product.attributes.images} category={category} url={url} />
          </Box>

          <Stack spacing={1}>
            <Stack spacing={0.5}>


              <ProductPrice price={product.attributes.price} sx={{ typography: 'body2' }} />


              <Link component={RouterLink}

              href={`${paths.travel.tour}/${category}/${url}`}


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

      url: PropTypes.string, // Added missing prop validation

    }),
  }),

  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func.isRequired,
};


StoreViewListItem.defaultProps = {
  favorites: [],
};


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
              href={`${paths.travel.tour}/${category}/${url}`}
              component={RouterLink}
            >
                  <Image
                    key={index}
                    alt={`Image ${index + 1}`}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item}`}
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


  category: PropTypes.string.isRequired,

  url: PropTypes.string.isRequired,
};
