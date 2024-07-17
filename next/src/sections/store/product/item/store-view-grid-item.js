import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import ProductPrice from '../../common/product-price';
import ProductRating from '../../common/product-rating';

export default function StoreViewGridItem({ product, sx, ...other }) {
  return (
    <Stack
      sx={{
        position: 'relative',
        '&:hover .add-to-cart': {
          opacity: 1,
        },
        ...sx,
      }}
      {...other}
    >
      {product.attributes.status === 'new' && (
        <Label color="info" sx={{ position: 'absolute', m: 1, top: 0, right: 0, zIndex: 9 }}>
          NEW
        </Label>
      )}

      {product.attributes.status === 'sale' && (
        <Label color="error" sx={{ position: 'absolute', m: 1, top: 0, right: 0, zIndex: 9 }}>
          SALE
        </Label>
      )}

      <Box sx={{ position: 'relative', mb: 2 }}>
        <Fab
          component={RouterLink}
          href={paths.eCommerce.product}
          className="add-to-cart"
          color="primary"
          size="small"
          sx={{
            right: 8,
            zIndex: 9,
            bottom: 8,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('opacity', {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.shortest,
              }),
          }}
        >
          <Iconify icon="carbon:shopping-cart-plus" />
        </Fab>

        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.attributes.picture}`}
          sx={{
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />
      </Box>

      <Stack spacing={0.5}>
        <TextMaxLine variant="caption" line={1} sx={{ color: 'text.disabled' }}>
          {product.attributes.category}
        </TextMaxLine>

        <Link component={RouterLink}

          href={`${paths.travel.tour}/${product.attributes.category}/${product.attributes.url}`}

          color="inherit">
          <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
            {product.attributes.title}
          </TextMaxLine>
        </Link>

        <ProductPrice price={product.attributes.price} />

        <ProductRating ratingNumber={product.attributes.average_rating} label={`${product.attributes.total_reviews} reviews`} />
      </Stack>
    </Stack>
  );
}

StoreViewGridItem.propTypes = {
  product: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string,
      average_rating: PropTypes.number,
      total_reviews: PropTypes.number,
      picture: PropTypes.string,
      category: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
    }),
  }),
  sx: PropTypes.object,
};
