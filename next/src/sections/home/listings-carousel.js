import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';



import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowBasicButtons,
} from 'src/components/carousell';


import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import ListingItem from 'src/sections/components/listings/list/listing-item';

// ----------------------------------------------------------------------






export default function ListingsCarousel({ tours }) {

  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');


  const carousel = useCarousel({
    containScroll: true,
    slidesToShow: 4.1,
    slidesToScroll: 3,
    slideSpacing: '20px',

    slidesToShow: { xs: 1.1, md: 4.1 },
    slidesToScroll: { xs: 1, md: 3 },




  });

  return (
    <>
      <Carousel carousel={carousel}>
        {tours.map((tour) => (
          <ListingItem tour={tour} />
        ))}
      </Carousel>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 3 }}>

        <CarouselDotButtons
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />
        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />

      </Box>
    </>
  );
}



ListingsCarousel.propTypes = {
  tours: PropTypes.array,
};
