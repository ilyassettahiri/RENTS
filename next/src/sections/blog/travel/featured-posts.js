import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FeaturedPostItemSkeleton from 'src/sections/blog/travel/featured-post-item-skeleton';

import PostItem from './featured-post-item';

export default function FeaturedPosts({ posts, Loading }) {
  const featuredPost = posts[0];

  return (
    <Container
      maxWidth={false}
      sx={{
        pt: { xs: 0, md: 5 },
        pb: 10,
        paddingLeft: { lg: '50px' },
        paddingRight: { lg: '50px' },
      }}
    >
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          },
        }}
      >
        {/* Render Skeleton or PostItem based on Loading state */}
        {Loading ? (
          <FeaturedPostItemSkeleton largePost />
        ) : (
          <PostItem post={featuredPost} largePost />
        )}

        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          {(Loading ? [...Array(4)] : posts.slice(1, 5)).map((post, index) =>
            Loading ? (
              <FeaturedPostItemSkeleton key={index} />
            ) : (
              <PostItem key={post.id} post={post} />
            )
          )}
        </Box>
      </Box>
    </Container>
  );
}

FeaturedPosts.propTypes = {
  posts: PropTypes.array.isRequired,
  Loading: PropTypes.bool.isRequired,
};
