import PropTypes from 'prop-types';
import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import BusinessItem from './business-item';
import BusinessItemSkeleton from './business-item-skeleton';

// ----------------------------------------------------------------------

export default function BusinessList({ businesses, loading, favorites, onFavoriteToggle }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 32;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedBusinesses = businesses.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(businesses.length / itemsPerPage);

  return (
    <>


      <Stack spacing={4}>
        {(loading ? [...Array(itemsPerPage)] : paginatedBusinesses).map((business, index) =>
          business ? (
            <BusinessItem key={business.id} business={business} favorites={favorites} onFavoriteToggle={onFavoriteToggle} />
          ) : (
            <BusinessItemSkeleton key={index} />
          )
        )}
      </Stack>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{
          my: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />


    </>
  );
}

BusinessList.propTypes = {
  businesses: PropTypes.array,
  loading: PropTypes.bool,
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};
