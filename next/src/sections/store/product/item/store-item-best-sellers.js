import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { capitalizeFirstLetter } from 'src/utils/format-time';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

import ProductPrice from '../../common/product-price';
import ProductRating from '../../common/product-rating';

// ----------------------------------------------------------------------

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_LISTING_SMALL;

export default function StoreItemBestSellers({ product, ...other }) {

  const type = `${product.category}-for-rent`;

  return (
    <Link
      component={RouterLink}
      href={`${paths.travel.tour}/en/${product.city}/${product.category}/${type}/${product.url} `}
      color="inherit"
      underline="none"
    >
      <Stack
        spacing={2}
        direction="row"
        sx={{
          transition: (theme) =>
            theme.transitions.create('opacity', {
              easing: theme.transitions.easing.easeIn,
              duration: theme.transitions.duration.shortest,
            }),
          '&:hover': { opacity: 0.72 },
        }}
        {...other}
      >
        <Image
          src={`${BASE_URL}${product.picture}`}
          sx={{
            width: 80,
            height: 80,
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />

        <Stack spacing={0.5}>
          <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>

            {capitalizeFirstLetter(product.title)}
          </TextMaxLine>

          <ProductRating ratingNumber={product.averageRating} label={`${product.totalReviews} reviews`} />


          <ProductPrice price={product.price} priceSale={product.priceSale} />
        </Stack>
      </Stack>
    </Link>
  );
}

StoreItemBestSellers.propTypes = {
  product: PropTypes.shape({
    picture: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
    sold: PropTypes.number,
    ratingNumber: PropTypes.number,
    averageRating: PropTypes.number,
    totalReviews: PropTypes.number,
    category: PropTypes.string,
    city: PropTypes.string,

    url: PropTypes.string,
  }).isRequired,
};
