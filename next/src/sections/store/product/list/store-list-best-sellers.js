import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import StoreItemBestSellers from '../item/store-item-best-sellers';

// ----------------------------------------------------------------------

export default function StoreListBestSellers({ products }) {
  return (
    <Stack spacing={3}>
      <Typography variant="h6">Best Sellers</Typography>

      {products.slice(0, 8).map((product) => (
        <StoreItemBestSellers key={product.id} product={product} />
      ))}
    </Stack>
  );
}

StoreListBestSellers.propTypes = {
  products: PropTypes.array,
};
