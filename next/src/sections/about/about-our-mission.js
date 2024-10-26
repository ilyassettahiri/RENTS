import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

export default function AboutOurMission({ profilePicture, third, last }) {
  const mdUp = useResponsive('up', 'md');

  return (
    <Container
      maxWidth={false}
      sx={{
        overflow: 'hidden',
        py: { xs: 5, md: 10 },
        paddingLeft: { lg: '100px' },
        paddingRight: { lg: '100px' },
      }}
    >
      <Grid
        container
        spacing={{
          xs: 8,
          md: 3,
        }}
        justifyContent="space-between"
      >
        <Grid xs={12} md={3}>
          <Typography variant="h3" sx={{ pt: { md: 5 } }}>
              What We Offer

          </Typography>

          <Typography sx={{ color: 'text.secondary', mt: 3 }}>
            At RENTS.ma, we offer a wide variety of rentals tailored to your needs:
            <br /><br />
            <strong>Car Rentals:</strong> Choose from a variety of vehicles for any occasion, whether you need a family car for a road trip or a luxury vehicle for a special event.
            <br /><br />
            <strong>Vacation Homes & Apartments:</strong> Find the perfect place to stay during your Moroccan adventure, with a wide range of vacation rentals available in cities, coastal areas, and rural destinations.
            <br /><br />
            <strong>Experiences:</strong> Explore Morocco like never before. From guided tours and adventure activities to local experiences, RENTS.ma helps you book unforgettable moments.
            <br /><br />
            <strong>Equipment Rentals:</strong> Need a tool, camera, or sports gear? We have a selection of equipment rentals available to make sure you’re fully equipped for any project or adventure.
          </Typography>
        </Grid>

        {mdUp && (
          <Grid xs={12} md={4}>
            <Image
              alt="about introduce"
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${profilePicture}`}
              ratio="3/4"
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        )}

        <Grid xs={12} md={3}>
          <Typography variant="h3" sx={{ pt: { md: 5 } }}>
              Why Choose RENTS.ma?
          </Typography>

          <Typography sx={{ color: 'text.secondary', mt: 3 }}>
            <strong>1. Trusted and Verified Listings</strong>
            <br />
            All our listings are verified, ensuring you have access to trusted and high-quality rentals. We work closely with our hosts and partners to maintain a standard of reliability and customer satisfaction.
            <br /><br />
            <strong>2. Easy and Secure Booking</strong>
            <br />
            Our user-friendly platform allows you to browse, compare, and book rentals with ease. With a simple booking process and secure payment options, we make renting stress-free.
            <br /><br />
            <strong>3. Local Expertise</strong>
            <br />
            As a platform built for Morocco, we understand the local market and customer needs. Whether you’re in Marrakech, Fes, or Casablanca, our local expertise ensures that you find the best rental options available.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

AboutOurMission.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  third: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
};
