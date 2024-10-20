import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';

import LandingPostItem from './landing-post-item';
import LandingPostItemCarousel from './landing-post-item-carousel';

// ----------------------------------------------------------------------

export default function HomePosts({ posts }) {
  const mdUp = useResponsive('up', 'md');
  const { t } = useTranslation();

  const carousel = useCarousel({
    slidesToShow: 1,
    slidesToScroll: 1,
    ...CarouselDots({
      width: 1,
      bottom: 80,
      position: 'absolute',
    }),
  });

  return (
    <Box sx={{ bgcolor: 'grey.900' }}>
      {!mdUp && (
        <Typography variant="h2" sx={{ pt: 10, pb: 8, color: 'common.white', textAlign: 'center' }}>

          {t('latestPosts')}

        </Typography>
      )}

      <Box
        gap={{ xs: 8, md: 0 }}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <Box sx={{ overflow: 'hidden', position: 'relative' }}>
          <CarouselArrows
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
            leftButtonProps={{ sx: { color: 'common.white' } }}
            rightButtonProps={{ sx: { color: 'common.white' } }}
          >
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {posts.map((post) => (
                <LandingPostItemCarousel key={post.id} post={post} />
              ))}
            </Carousel>
          </CarouselArrows>
        </Box>

        <Box
          sx={{
            px: { xs: 2.5, sm: 5, md: 8, lg: 15 },
          }}
        >
          {mdUp && (
            <Typography variant="h2" sx={{ color: 'common.white', py: 10 }}>
              {t('latestPosts')}
            </Typography>
          )}

          <Stack spacing={3}>
            {posts.slice(0, 5).map((post) => (
              <LandingPostItem key={post.id} post={post} />
            ))}
          </Stack>

          <Box
            sx={{
              mt: { xs: 8, md: 5 },
              mb: 10,
              textAlign: { xs: 'center', md: 'right' },
            }}
          >
            <Button
              color="primary"
              component={RouterLink}
              href={paths.travel.posts}
              endIcon={<Iconify icon="carbon:chevron-right" />}
            >
              {t('viewAll')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

HomePosts.propTypes = {
  posts: PropTypes.array.isRequired,
};
