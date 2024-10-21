import PropTypes from 'prop-types';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import PostItemSkeleton from 'src/sections/blog/travel/post-item-skeleton';

import PostItem from './post-item';

export default function Posts({ posts, Loading }) {
  const [page, setPage] = useState(1);
  const postsPerPage = 12;
  const handleChange = (event, value) => {
    setPage(value);
  };

  // Paginated posts or skeletons based on loading state
  const paginatedPosts = Loading
    ? Array.from({ length: postsPerPage }) // Create an array with empty elements to match the skeleton count
    : posts.slice((page - 1) * postsPerPage, page * postsPerPage);

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
        {Loading
          ? paginatedPosts.map((_, index) => (
              <PostItemSkeleton key={index} />
            ))
          : paginatedPosts.map((post) => (
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
  Loading: PropTypes.bool.isRequired,
};
