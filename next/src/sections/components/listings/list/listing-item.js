import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { fCurrency } from 'src/utils/format-number';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import CrudService from 'src/services/cruds-service';
import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';

export default function ListingsItem({ tour, favorites = [], onFavoriteToggle }) {
  const { attributes } = tour;
  const { title, city, price, created_at, category, url, id, images } = attributes;

  const formattedDuration = formatDistanceToNow(new Date(created_at), { addSuffix: true });

  const isFavorite = favorites.includes(id);
  const [favorite, setFavorite] = useState(isFavorite);

  const handleChangeFavorite = useCallback(async () => {
    try {
      const response = await CrudService.createFavorite(category, url, id);
      setFavorite(response.favorite);
      onFavoriteToggle(id, response.favorite);
    } catch (error) {
      console.error('Failed to update favorite:', error);
    }
  }, [category, url, id, onFavoriteToggle]);

  useEffect(() => {
    setFavorite(isFavorite); // Ensure state is updated when favorites prop changes
  }, [isFavorite]);

  return (
    <Card sx={{ position: 'relative' }}>
      {/* Carousel of Images */}
      <Box sx={{ position: 'relative' }}>
        <CarouselBasic1 data={images} />

        {/* Price and Favorite at the Top */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            pt: 1.5,
            pl: 2,
            pr: 1.5,
            top: 0,
            width: 1,
            zIndex: 9,
            position: 'absolute',
          }}
        >
          <Stack
            spacing={0.5}
            direction="row"
            sx={{
              px: 1,
              borderRadius: 0.75,
              typography: 'subtitle2',
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            }}
          >
            {fCurrency(price)}
          </Stack>

          <Checkbox
            color="error"
            checked={favorite}
            onChange={handleChangeFavorite}
            icon={<Iconify icon="carbon:favorite" />}
            checkedIcon={<Iconify icon="carbon:favorite-filled" />}
            sx={{ color: 'common.white' }}
          />
        </Stack>

        {/* City and Duration at the Bottom */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            pb: 1.5,
            pl: 2,
            pr: 1.5,
            bottom: 0,
            width: 1,
            zIndex: 9,
            position: 'absolute',
          }}
        >
          <Stack
            spacing={0.5}
            direction="row"
            sx={{
              px: 1,
              borderRadius: 0.75,
              typography: 'subtitle2',
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            }}
          >
            <Iconify icon="carbon:location" sx={{ mr: 0.2, mt: 0.3 }} width={16} /> {city}
          </Stack>
        </Stack>
      </Box>

      {/* Title */}
      <Stack spacing={0.5} sx={{ pt: 4, pl: 2.5 }}>
        <Link
          component={RouterLink}
          href={`${paths.travel.tour}/${category}/${url}`}
          color="inherit"
        >
          <TextMaxLine variant="h6" persistent>
            {title}
          </TextMaxLine>
        </Link>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* Rating */}
      <Stack direction="row" alignItems="center" sx={{ p: 2.5 }}>
        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', color: 'text.disabled' }}
        >
          <Iconify icon="carbon:time" width={16} sx={{ mr: 1 }} /> {formattedDuration}
        </Stack>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
          <Box sx={{ typography: 'h6' }}>5.0</Box>
        </Stack>
      </Stack>
    </Card>
  );
}

ListingsItem.propTypes = {
  tour: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func.isRequired,
};

ListingsItem.defaultProps = {
  favorites: [],
};

// CarouselBasic1 Component

function CarouselBasic1({ data }) {
  const carousel = useCarousel({
    autoplay: false,
  });

  return (
    <>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {data.map((item, index) => (
          <Image
            key={index}
            alt={`Image ${index + 1}`}
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item}`}
            ratio="4/3"
          />
        ))}
      </Carousel>

      <Box sx={{ position: 'relative', zIndex: 999 }}>  {/* Added z-index 999 here */}
        <CarouselArrowIndex
          index={carousel.currentIndex}
          total={data.length}
          onNext={carousel.onNext}
          onPrev={carousel.onPrev}
        />
      </Box>
    </>
  );
}

CarouselBasic1.propTypes = {
  data: PropTypes.array.isRequired,
};
