import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Image from 'src/components/image';
import { formatDistanceToNow } from 'date-fns';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import ProductPrice from '../../common/product-price';
import ProductRating from '../../common/product-rating';

export default function StoreViewListItem({ product, ...other }) {

  const formattedDuration = formatDistanceToNow(new Date(product.attributes.created_at), { addSuffix: true });

  return (
    <Stack
      direction="row"
      sx={{
        position: 'relative',
        '&:hover .add-to-cart': {
          opacity: 1,
        },
      }}
      {...other}
    >

        <Label color="error" sx={{ position: 'absolute', m: 1, top: 0, left: 0, zIndex: 9 }}>
          <ProductPrice price={product.attributes.price} sx={{ typography: 'h6' }} />

        </Label>




      <Fab
        component={RouterLink}
        href={paths.eCommerce.product}
        className="add-to-cart"
        color="primary"
        size="small"
        sx={{
          right: 8,
          zIndex: 9,
          top: 8,
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
        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${product.attributes.picture}`}
        ratio="1/1"
        sx={{
          mr: 2,
          width: 200,
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: 'background.neutral',
        }}
      />

      <Stack spacing={1}>
        <Stack spacing={0.5}>
          <TextMaxLine variant="caption" line={1} sx={{ color: 'text.disabled' }}>
            {product.attributes.category}
          </TextMaxLine>

          <Link component={RouterLink}

           href={`${paths.travel.tour}/${product.attributes.category}/${product.attributes.url}`}


           color="inherit">
            <TextMaxLine variant="h6" line={1}>
              {product.attributes.title}
            </TextMaxLine>
          </Link>
        </Stack>

        <ProductRating ratingNumber={product.attributes.average_rating} label={`${product.attributes.total_reviews} reviews`} />

        <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ typography: 'body2', color: 'text.secondary' }}
                >
                    <Iconify icon="carbon:time" width={13} sx={{ mr: 0.5 }} />


                      <Box sx={{ typography: 'body2' }}>
                       {formattedDuration}
                      </Box>




        </Stack>



      </Stack>
    </Stack>
  );
}

StoreViewListItem.propTypes = {
  product: PropTypes.shape({
    attributes: PropTypes.shape({
      status: PropTypes.string,
      picture: PropTypes.string,
      category: PropTypes.string,
      title: PropTypes.string,
      average_rating: PropTypes.number,
      total_reviews: PropTypes.number,
      created_at: PropTypes.string,
      price: PropTypes.number,
      url: PropTypes.string, // Added missing prop validation

    }),
  }),
};
