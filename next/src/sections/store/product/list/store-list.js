'use client';


import { useState } from 'react';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import StoreViewListItem from '../item/store-view-list-item';
import StoreViewGridItem from '../item/store-view-grid-item';
import StoreViewListItemSkeleton from '../item/store-view-list-item-skeleton';
import StoreViewGridItemSkeleton from '../item/store-view-grid-item-skeleton';

export default function StoreList({ loading, viewMode, products , favorites, onFavoriteToggle,}) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 30;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <>
      {viewMode === 'grid' ? (
        <Box
          rowGap={4}
          columnGap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {(loading ? [...Array(itemsPerPage)] : paginatedProducts).map((product, index) =>
            product ? (
              <StoreViewGridItem key={product.id} product={product} favorites={favorites} onFavoriteToggle={onFavoriteToggle}/>
            ) : (
              <StoreViewGridItemSkeleton key={index} />
            )
          )}
        </Box>
      ) : (
        <Stack spacing={4}>
          {(loading ? [...Array(itemsPerPage)] : paginatedProducts).map((product, index) =>
            product ? (
              <StoreViewListItem key={product.id} product={product} favorites={favorites} onFavoriteToggle={onFavoriteToggle}/>
            ) : (
              <StoreViewListItemSkeleton key={index} />
            )
          )}
        </Stack>
      )}

      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{
          mt: 10,
          mb: 5,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}

StoreList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.array,
  viewMode: PropTypes.string,
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};
