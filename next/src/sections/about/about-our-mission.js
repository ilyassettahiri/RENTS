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
            Fusce convallis metus id felis luctus
          </Typography>

          <Typography sx={{ color: 'text.secondary', mt: 3 }}>
            <span dangerouslySetInnerHTML={{ __html: third }} />
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
            Fusce convallis metus id felis luctus
          </Typography>

          <Typography sx={{ color: 'text.secondary', mt: 3 }}>
            <span dangerouslySetInnerHTML={{ __html: last }} />
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
