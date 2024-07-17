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

export default function ListingsItem({ tour, favorites = [], onFavoriteToggle }) {
  const { attributes } = tour



  const { title, city, price, picture, created_at, category, url, id } = attributes;



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
    <Card>
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

      <Image alt={title} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${picture}`} ratio="1/1" />

      <Stack spacing={0.5} sx={{ p: 2.5 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {city}
        </Typography>

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
          <Box sx={{ typography: 'h6' }}>
            5.0
          </Box>
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
      picture: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func.isRequired,
};

// Ensure that favorites is an array and not undefined
ListingsItem.defaultProps = {
  favorites: [],
};
