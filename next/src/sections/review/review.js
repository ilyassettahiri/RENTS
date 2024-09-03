import { useState, useCallback } from 'react';
import CrudService from 'src/services/cruds-service';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useBoolean } from 'src/hooks/use-boolean';
import PropTypes from 'prop-types';

import ReviewList from './review-list';
import ReviewToolbar from './review-toolbar';
import ReviewNewForm from './review-new-form';
import ReviewSummary from './review-summary';

export default function Review({ category, url, reviews, seller }) {
  const [sort, setSort] = useState('latest');
  const [reviewList, setReviewList] = useState(reviews);
  const formOpen = useBoolean();

  const handleChangeSort = useCallback((event) => {
    setSort(event.target.value);
  }, []);

  const handleLike = async (reviewId) => {
    try {
      const response = await CrudService.createReviewHelpful({}, category, url, reviewId);
      if (response.data.success) {
        setReviewList((prevReviews) =>
          prevReviews.map((review) =>
            review.id === reviewId ? { ...review, helpful: response.data.likes } : review
          )
        );
      }
    } catch (error) {
      console.error('Failed to like review:', error);
    }
  };




  return (
    <>
      <Container maxWidth={false} sx={{ overflow: 'hidden',  }}>
        <Grid container spacing={8}>
          <Grid xs={12} md={5} lg={4}>
            <ReviewSummary reviews={reviewList} reviewNumber={reviewList.length} />
          </Grid>

          <Grid xs={12} md={7} lg={8}>
            <ReviewToolbar
              sort={sort}
              totalReviews={reviewList.length}
              onChangeSort={handleChangeSort}
              onOpenReview={formOpen.onToggle}
            />

            <ReviewList reviews={reviewList} onLike={handleLike} category={category} url={url} />
          </Grid>
        </Grid>
      </Container>

      <ReviewNewForm
        open={formOpen.value}
        onClose={formOpen.onFalse}
        category={category}
        url={url}
      />
    </>
  );
}

Review.propTypes = {
  category: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  reviews: PropTypes.array.isRequired,
  seller: PropTypes.shape({
    name: PropTypes.string,
    profile_image: PropTypes.string,
    created_at: PropTypes.string,
    about: PropTypes.string,
    quotes: PropTypes.string,
    ratingNumber: PropTypes.number,
    totalReviews: PropTypes.number,
    verified: PropTypes.bool,
  }).isRequired,
};
