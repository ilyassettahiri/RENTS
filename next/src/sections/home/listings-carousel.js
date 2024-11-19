'use client';


import { useState, useCallback, useEffect, useMemo } from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';

import { useTranslation } from 'react-i18next';


import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowBasicButtons,
} from 'src/components/carousell';


import { paths as getPaths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import ListingItem from 'src/sections/components/listings/list/listing-item';

// ----------------------------------------------------------------------






export default function ListingsCarousel({ tours, title }) {

  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const { i18n } = useTranslation();
  const paths = useMemo(() => getPaths(i18n.language), [i18n.language]);
  const carousel = useCarousel({
    containScroll: true,

    slideSpacing: '20px',

    slidesToShow: { xs: 1.1, md: 3.8 },
    slidesToScroll: { xs: 1, md: 3 },




  });

  return (
    <>

      <Typography variant="h4" sx={{ my: 3 }}>{title}</Typography>



      <Carousel carousel={carousel}>
        {tours.map((tour) => (
          <ListingItem tour={tour} />
        ))}
      </Carousel>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 3 }}>

        <Box/>
        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />

      </Box>
    </>
  );
}



ListingsCarousel.propTypes = {
  tours: PropTypes.array,
  title: PropTypes.string,

};
