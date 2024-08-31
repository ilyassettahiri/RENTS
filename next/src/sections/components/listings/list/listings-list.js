import PropTypes from 'prop-types';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import ListingItem from 'src/sections/components/listings/list/listing-item';
import ListingsItemSkeleton from './listings-item-skeleton';

const ITEMS_PER_PAGE = 32;

export default function ListingsList({ tours, loading, favorites, onFavoriteToggle, columns = 4 }) {
  const [currentPage, setCurrentPage] = useState(1);





  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastTour = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstTour = indexOfLastTour - ITEMS_PER_PAGE;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);

  return (
    <>
      <Box
        sx={{
          columnGap: { xs: 2, md: 3 },
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: `repeat(${columns}, 1fr)`,
          },
        }}
      >
        {(loading ? [...Array(ITEMS_PER_PAGE)] : currentTours).map((tour, index) =>
          tour ? (
            <ListingItem key={tour.id} tour={tour} favorites={favorites} onFavoriteToggle={onFavoriteToggle} />
          ) : (
            <ListingsItemSkeleton key={index} />
          )
        )}
      </Box>

      <Pagination
        count={Math.ceil(tours.length / ITEMS_PER_PAGE)}
        page={currentPage}
        onChange={handlePageChange}
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

ListingsList.propTypes = {
  tours: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  columns: PropTypes.number, // New prop for columns

};
