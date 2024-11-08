'use client';

import { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'src/context/AuthContextProvider';
import { useTranslation } from 'react-i18next';

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

export default function HomeHero({ tours, categoryy }) {
  const mdUp = useResponsive('up', 'md');
  const { t } = useTranslation();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const { handleCategoryClick } = useContext(AuthContext);

  const carouselLarge = useCarousel({
    speed: 0,
    slidesToShow: 1,
    centerMode: true,

    slidesToScroll: mdUp ? 6 : 3,
    draggable: false,
    swipeToSlide: false,
    centerPadding: '0px',

    adaptiveHeight: true,
    loop: false,
    totalSlides: tours.length, // Pass the length of tours to useCarousel

  });

  const carouselThumb = useCarousel({
    horizontal: true,
    slidesToShow: mdUp ? 6 : 3,
    centerMode: false,
    slidesToScroll: mdUp ? 6 : 3,
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
         <CarouselItem categoryy={categoryy} /> {/* Display only one image */}
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
              <Typography variant="h1" component="h1" sx={{ display: 'none' }}>
              Explore Morocco's Largest Rental Marketplace
              Find everything you need to rent across Morocco – from cars, homes, and offices to sports equipment, tools, and more. Discover local services, compare prices, and connect with trusted providers on RENTS.ma.


              </Typography>

            <CarouselArrows filled shape="rounded" onNext={carouselThumb.onNext}
              onPrev={carouselThumb.onPrev}
              isPrevDisabled={carouselThumb.isPrevDisabled}
              isNextDisabled={carouselThumb.isNextDisabled}
            >


                  {!!tours.length && (
                    <Carousel {...carouselThumb.carouselSettings} ref={carouselThumb.carouselRef}>
                      {tours.map((tour, index) => (
                        <ThumbnailItem
                          key={tour.id}
                          tour={tour}
                          selected={selectedIndex === index}
                          onClick={() => handleThumbnailClick(index,tour.categories.value)}
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
  categoryy: PropTypes.string.isRequired,

};

// ----------------------------------------------------------------------

function CarouselItem({ categoryy }) {
  const theme = useTheme();

  const renderOverlay = (
    <Box
      sx={{
        ...bgGradient({
          startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
          endColor: `${theme.palette.common.black} 100%`,
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
          src={`${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/categoriescover/${categoryy}.jpg`}
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
  categoryy: PropTypes.string.isRequired,

};

// ----------------------------------------------------------------------

function ThumbnailItem({ tour, selected, onClick }) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const { t } = useTranslation();


  return (
    <Stack
    direction={mdUp ? 'row' : 'column'}
      alignItems="center"
      spacing={1}
      onClick={onClick}
      sx={{
        px: { xs: 0.5, md: 1.5 },
        py: { xs: 0.5, md: 1.5 },
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
      <Avatar src={`${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/categoryiconcover/${tour.categories.value}.svg`} sx={{ width: 45, height: 45 }} />


        <Stack spacing={0.5}   >
          <TextMaxLine variant="h6" line={1}>



          {t(tour.categories.label)}
          </TextMaxLine>

        </Stack>

    </Stack>
  );
}

ThumbnailItem.propTypes = {
  tour: PropTypes.object,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};
