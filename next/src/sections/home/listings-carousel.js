import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';



import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';


import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import ListingItem from 'src/sections/components/listings/list/listing-item';

// ----------------------------------------------------------------------

export default function ListingsCarousel({ tours }) {

  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const carousel = useCarousel({
    slidesToShow: 4,
    slidesToScroll: 3,
    ...CarouselDots(),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 1 },
      },
    ],
  });


  return (
    <Container maxWidth={false}
      sx={{
        py: { xs: 5, md: 10 },

      }}
    >




      <Box sx={{ position: 'relative' }}>
        <CarouselArrows
          onNext={carousel.onNext}
          onPrev={carousel.onPrev}
          leftButtonProps={{ sx: { left: { xs: 0, md: -40 } } }}
          rightButtonProps={{ sx: { right: { xs: 0, md: -40 } } }}
        >
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {tours.map((tour) => (
              <Box
                key={tour.id}
                sx={{
                  px: 2,
                  py: { xs: 8, md: 10 },
                }}
              >
                <ListingItem tour={tour} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>







    </Container>
  );
}

ListingsCarousel.propTypes = {
  tours: PropTypes.array,
};
