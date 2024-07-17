import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { fCurrency } from 'src/utils/format-number';

import { bgBlur, bgGradient } from 'src/theme/css';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import Carousel, { useCarousel, CarouselDots } from 'src/components/carousel';
import horizontal from 'src/components/nav-section/horizontal';

// ----------------------------------------------------------------------



export default function HomeHero({ tours }) {
  const mdUp = useResponsive('up', 'md');

  const carouselLarge = useCarousel({
    speed: 500,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    ...CarouselDots({
      rounded: true,
      sx: {
        left: 0,
        right: 0,
        zIndex: 9,
        bottom: 64,
        position: 'absolute',
        display: { md: 'none' },
      },
    }),
  });

  const carouselThumb = useCarousel({
    horizontal: true,
    slidesToShow: 5,
    centerMode: true,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    horizontalSwiping: true,
  });

  useEffect(() => {
    carouselLarge.onSetNav();
    carouselThumb.onSetNav();
  }, [carouselLarge, carouselThumb]);

  return (
    <Box sx={{ minHeight: { md: '60vh' }, position: 'relative' }}>



      {!!tours.length && (
        <Carousel
          {...carouselLarge.carouselSettings}
          asNavFor={carouselThumb.nav}
          ref={carouselLarge.carouselRef}
        >
          {tours.map((tour) => (
            <CarouselItem key={tour.id} tour={tour} />
          ))}

        </Carousel>

      )}



      {mdUp && (
        <Stack
          spacing={2}
          justifyContent="center"
          sx={{
            top: 0,
            height: 1,
            mt:3,
            width: '100%', // Set to full width
            position: 'absolute',
            right: { xs: 20, lg: '6%', xl: '0%' },
            paddingLeft: { lg: '100px' },
            paddingRight: { lg: '100px' },


          }}
        >

          <Typography variant="h4" sx={{ mt:-15, mb:3, color: 'white', textAlign: 'center' }}>
            Find Everything at RENT.ma
          </Typography>



          {!!tours.length && (
            <Carousel
              {...carouselThumb.carouselSettings}
              asNavFor={carouselLarge.nav}
              ref={carouselThumb.carouselRef}
            >
              {tours.map((tour, index) => (
                <ThumbnailItem
                  key={tour.id}
                  tour={tour}
                  selected={carouselLarge.currentIndex === index}
                />
              ))}
            </Carousel>
          )}
        </Stack>
      )}
    </Box>
  );
}

HomeHero.propTypes = {
  tours: PropTypes.array,
};













// ----------------------------------------------------------------------

function CarouselItem({ tour }) {
  const theme = useTheme();

  const renderOverlay = (
    <Box
      sx={{
        ...bgGradient({
          startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
          endColor: `${theme.palette.common.black} 75%`,
        }),
        backgroundColor: alpha(theme.palette.common.black, 0.24),
        top: 0,
        left: 0,
        zIndex: 8,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    />
  );

  return (
    <Box
      sx={{
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        position: 'relative',
        color: 'common.white',
        justifyContent: 'center',
      }}
    >


      <Stack
        alignItems="center"
        sx={{
          zIndex: 9,
          py: { xs: 20, md: 0 },
          position: { md: 'absolute' },
        }}
      >







      </Stack>

      <Box
        sx={{
          width: 1,
          height: 1,
          position: {
            xs: 'absolute',
            md: 'relative',
          },
        }}
      >

        {renderOverlay}

        <Image
          alt="hero"
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${tour.heroUrl}`}


          sx={{
            width: 1,
            height: { xs: 1, md: '70vh' },
          }}
        />
      </Box>
    </Box>
  );
}

CarouselItem.propTypes = {
  tour: PropTypes.shape({

    heroUrl: PropTypes.string,
    categories: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

function ThumbnailItem({ tour, selected }) {
  const theme = useTheme();

  return (


    <Stack
      direction="row"
      alignItems="center"
      spacing={2.5}
      sx={{
        px: 2,
        py: 1.5,
        cursor: 'pointer',
        color: 'common.white',
        ...(selected && {
          borderRadius: 2,
          ...bgBlur({
            opacity: 0.08,
            color: theme.palette.common.white,
          }),
        }),
      }}
    >



      <Avatar src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${tour.heroUrl}`}  sx={{ width: 48, height: 48 }} />

      <Stack spacing={0.5}>
        <TextMaxLine variant="h6" line={1}>
          {tour.categories}
        </TextMaxLine>


      </Stack>
    </Stack>
  );
}

ThumbnailItem.propTypes = {
  tour: PropTypes.object,
  selected: PropTypes.bool,
};
