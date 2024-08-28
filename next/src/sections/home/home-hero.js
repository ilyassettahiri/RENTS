'use client';

import { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'src/context/AuthContextProvider';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur, bgGradient } from 'src/theme/css';
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

export default function HomeHero({ tours }) {
  const mdUp = useResponsive('up', 'md');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { handleCategoryClick } = useContext(AuthContext);

  const carouselLarge = useCarousel({
    speed: 500,
    slidesToShow: 1,
    centerMode: true,

    slidesToScroll: 5,
    draggable: false,
    swipeToSlide: false,
    centerPadding: '0px',

    adaptiveHeight: true,
    loop: false,
    totalSlides: tours.length, // Pass the length of tours to useCarousel

  });

  const carouselThumb = useCarousel({
    horizontal: true,
    slidesToShow: 5,
    centerMode: false,
    slidesToScroll: 5,
    swipeToSlide: true,
    draggable: true,
    focusOnSelect: true,
    centerPadding: '0px',
    horizontalSwiping: true,
    loop: false,
    totalSlides: tours.length, // Pass the length of tours to useCarousel


  });

  useEffect(() => {
    carouselLarge.onSetNav();
    carouselThumb.onSetNav();
  }, [carouselLarge, carouselThumb]);

  const handleThumbnailClick = (index, category) => {
    setSelectedIndex(index);
    if (carouselLarge.carouselRef.current) {
      carouselLarge.carouselRef.current.slickGoTo(index);
    }
    handleCategoryClick(category);
  };

  return (
    <Box sx={{ minHeight: { md: '55vh' }, position: 'relative' }}>
      {!!tours.length && (
        <Carousel {...carouselLarge.carouselSettings} ref={carouselLarge.carouselRef}>
          {tours.map((tour, index) => (
            <CarouselItem key={tour.id} tour={tour} />
          ))}
        </Carousel>
      )}



          <Stack
            spacing={2}
            justifyContent="center"
            sx={{
              top: 0,
              height: 1,

              width: '100%',
              position: 'absolute',

              paddingLeft: { lg: '100px' },
              paddingRight: { lg: '100px' },
              mt: { xs: -4, md: -8 } ,
            }}
          >


            <CarouselArrows filled shape="rounded" onNext={carouselThumb.onNext} onPrev={carouselThumb.onPrev}>


                  {!!tours.length && (
                    <Carousel {...carouselThumb.carouselSettings} ref={carouselThumb.carouselRef}>
                      {tours.map((tour, index) => (
                        <ThumbnailItem
                          key={tour.id}
                          tour={tour}
                          selected={selectedIndex === index}
                          onClick={() => handleThumbnailClick(index,tour.categories)}
                        />
                      ))}
                    </Carousel>
                  )}


            </CarouselArrows>
          </Stack>


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
      />
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
          src={`${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/${tour.heroUrl}`}
          sx={{
            width: 1,
            height: { xs: 1, md: '55vh' },
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

function ThumbnailItem({ tour, selected, onClick }) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');



  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      onClick={onClick}
      sx={{
        px: 1,
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
      <Avatar src={`${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/${tour.heroUrl}`} sx={{ width: 48, height: 48 }} />
      {mdUp && (

        <Stack spacing={0.5}   >
          <TextMaxLine variant="h6" line={1}>

            {tour.categories}
          </TextMaxLine>

        </Stack>
      )}
    </Stack>
  );
}

ThumbnailItem.propTypes = {
  tour: PropTypes.object,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};
