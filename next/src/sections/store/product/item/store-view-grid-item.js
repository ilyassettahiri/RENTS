import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { formatDistanceToNow } from 'date-fns';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import ProductPrice from '../../common/product-price';
import ProductRating from '../../common/product-rating';

export default function StoreViewGridItem({ product, sx, ...other }) {

  const formattedDuration = formatDistanceToNow(new Date(product.attributes.created_at), { addSuffix: true });

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

        <Label color="error" sx={{ position: 'absolute', m: 1, top: 0, left: 0, zIndex: 9 }}>
          <ProductPrice price={product.attributes.price} sx={{ typography: 'body2' }} />


        </Label>




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
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${product.attributes.picture}`}
          ratio="6/4"
          sx={{
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />
      </Box>

      <Stack spacing={0.5}>


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



        <Link
          component={RouterLink}
          href={`${paths.travel.tour}/${product.attributes.category}/${product.attributes.url}`}
          color="inherit"
        >
          <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
            {product.attributes.title}
          </TextMaxLine>
        </Link>


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
      created_at: PropTypes.string,

      price: PropTypes.number,
      status: PropTypes.string,
      url: PropTypes.string, // Added missing prop validation
    }),
  }).isRequired,
  sx: PropTypes.object,
};
