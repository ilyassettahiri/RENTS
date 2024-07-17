import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PostItem from './featured-post-item';

export default function FeaturedPosts({ posts }) {
  const featuredPost = posts[0];

  return (
    <Container
      maxWidth={false}
      sx={{
        pt: { xs: 0, md: 5 },
        pb: 10,
        paddingLeft: { lg: '100px' },
        paddingRight: { lg: '100px' },
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
        <PostItem post={featuredPost} largePost />
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
          {posts.slice(1, 5).map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}

FeaturedPosts.propTypes = {
  posts: PropTypes.array.isRequired,
};
