import PropTypes from 'prop-types';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import ServiceItem from './services-item';
import ServiceItemSkeleton from './services-item-skeleton';

// ----------------------------------------------------------------------

export default function ServiceList({ jobs, loading }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedJobs = jobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  return (
    <>
      <Box
        sx={{
          columnGap: 4,
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {(loading ? [...Array(itemsPerPage)] : paginatedJobs).map((job, index) =>
          job ? <ServiceItem key={job.id} job={job} /> : <ServiceItemSkeleton key={index} />
        )}
      </Box>

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

ServiceList.propTypes = {
  jobs: PropTypes.array,
  loading: PropTypes.bool,
};
