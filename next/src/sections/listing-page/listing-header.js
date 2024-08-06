import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
// Define the specific social media icons
const socialMediaIcons = [
  { label: 'Facebook', icon: 'eva:facebook-fill', color: '#3b5998' },
  { label: 'Instagram', icon: 'ant-design:instagram-filled', color: '#E4405F' },
  { label: 'TikTok', icon: 'cib:tiktok', color: '#000000' },
  { label: 'Twitter', icon: 'eva:twitter-fill', color: '#1DA1F2' },
  { label: 'LinkedIn', icon: 'eva:linkedin-fill', color: '#0077B5' },
];

export default function ListingHeader({ tour, seller }) {
  const { attributes } = tour;
  const { title, city, created_at, average_rating, total_reviews } = attributes;
  const { name, profile_image } = seller;
  const formattedDuration = formatDistanceToNow(new Date(created_at), { addSuffix: true });

  const favorited = false;

  const [favorite, setFavorite] = useState(favorited);
  const [open, setOpen] = useState(null);

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleChangeFavorite = useCallback((event) => {
    setFavorite(event.target.checked);
  }, []);

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          mb: 3,
        }}
      >
        <Typography variant="h3" component="h1" sx={{ flexGrow: 1, pr: { md: 10 } }}>
          {title}
        </Typography>

        <Stack direction="row" alignItems="center" flexShrink={0}>
          <IconButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
            <Iconify icon="carbon:share" />
          </IconButton>

          <Checkbox
            color="error"
            checked={favorite}
            onChange={handleChangeFavorite}
            icon={<Iconify icon="carbon:favorite" />}
            checkedIcon={<Iconify icon="carbon:favorite-filled" />}
          />
        </Stack>
      </Stack>

      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>

        <Stack direction="row" alignItems="center">
          <Avatar src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${profile_image}`} sx={{ width: 24, height: 24 }} />

          <Link variant="subtitle2" color="inherit" sx={{ mx: 1 }}>
            {name}
          </Link>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            verified
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Iconify icon="carbon:location" sx={{ mr: 0.5 }} /> {city}
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Iconify icon="carbon:time" sx={{ mr: 0.5 }} /> Il y a {formattedDuration}

        </Stack>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />

          <Box sx={{ typography: 'h6' }}>
            {Number.isInteger(average_rating) ? `${average_rating}.0` : average_rating}
          </Box>

          <Link variant="body2" sx={{ color: 'text.secondary' }}>
            ({fShortenNumber(total_reviews)} reviews)
          </Link>
        </Stack>




      </Stack>

      <Popover
        open={!!open}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: { width: 220 },
          },
        }}
      >
        {socialMediaIcons.map((social) => (
          <MenuItem key={social.label} onClick={handleClose}>
            <Iconify icon={social.icon} width={24} sx={{ mr: 1, color: social.color }} />
            Share via {social.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}

ListingHeader.propTypes = {
  tour: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      average_rating: PropTypes.number.isRequired,
      total_reviews: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  seller: PropTypes.shape({
    profile_image: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};
