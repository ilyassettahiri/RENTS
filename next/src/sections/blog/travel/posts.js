import PropTypes from 'prop-types';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import PostItem from './post-item';

export default function Posts({ posts }) {
  const [page, setPage] = useState(1);
  const postsPerPage = 8;
  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedPosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage);

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
          },
        }}
      >
        {paginatedPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Box>
      <Pagination
        count={Math.ceil(posts.length / postsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{
          py: { xs: 8, md: 10 },
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};
