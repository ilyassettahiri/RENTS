import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';
import ServiceItem from 'src/sections/components/services/list/services-item';

export default function ListingsCarouselService({ tours }) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const carousel = useCarousel({
    slidesToShow: 3,
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

  console.log('Tours:', tours);

  const mappedTours = tours.map(tour => ({
    id: tour.id,
    title: tour.attributes.title,
    price: tour.attributes.price,
    city: tour.attributes.city,
    category: tour.attributes.category,
    createdAt: tour.attributes.created_at,
    picture: tour.attributes.picture,
    url: tour.attributes.url,
    favorited: false // Adjust this based on your data if needed
  }));

  return (
    <Container
      maxWidth={false}
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
            {mappedTours.map((tour) => (
              <Box
                key={tour.id}
                sx={{
                  px: 2,
                  py: { xs: 8, md: 10 },
                }}
              >
                <ServiceItem job={tour} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>
    </Container>
  );
}

ListingsCarouselService.propTypes = {
  tours: PropTypes.array.isRequired,
};
