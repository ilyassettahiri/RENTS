import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';


import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowBasicButtons,
} from 'src/components/carousell';


import ServiceItem from 'src/sections/components/services/list/services-item';

export default function ListingsCarouselService({ tours }) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const carousel = useCarousel({
    containScroll: true,

    slideSpacing: '20px',

    slidesToShow: { xs: 1.1, md: 4.1 },
    slidesToScroll: { xs: 1, md: 3 },




  });


  console.log('Tours:', tours);



  return (
    <Container
      maxWidth={false}
      sx={{
        pt: { xs: 5, md: 10 },
      }}
    >




      <Carousel carousel={carousel}>
        {tours.map((tour) => (
          <ServiceItem job={tour} />
        ))}
      </Carousel>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 3 }}>

        <Box/>
        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />

      </Box>


    </Container>
  );
}

ListingsCarouselService.propTypes = {
  tours: PropTypes.array.isRequired,
};
