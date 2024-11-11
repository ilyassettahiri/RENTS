import { useState, useCallback, useEffect, useMemo } from 'react';


import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { paths as getPaths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import ProductPrice from '../../common/product-price';

// ----------------------------------------------------------------------

export default function StoreItemHot({ product, hotProduct = false, sx }) {
  const attributes = product.attributes || {};
  const { title, price, picture } = attributes;

  const { i18n } = useTranslation();
  const paths = useMemo(() => getPaths(i18n.language), [i18n.language]);

  return (
    <Link component={RouterLink} href={paths.eCommerce.product} color="inherit" underline="none">
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.default',
          transition: (theme) =>
            theme.transitions.create('background-color', {
              easing: theme.transitions.easing.easeIn,
              duration: theme.transitions.duration.shortest,
            }),
          '&:hover': {
            bgcolor: 'background.neutral',
          },
          ...sx,
        }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${picture}`}
          sx={{
            mb: 2,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />

        <Stack spacing={0.5}>
          <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
            {title}
          </TextMaxLine>

          <ProductPrice
            price={price}
            sx={{
              ...(hotProduct && {
                color: 'error.main',
              }),
            }}
          />
        </Stack>
      </Paper>
    </Link>
  );
}

StoreItemHot.propTypes = {
  hotProduct: PropTypes.bool,
  product: PropTypes.shape({
    attributes: PropTypes.shape({
      picture: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number,
    }),
  }),
  sx: PropTypes.object,
};
