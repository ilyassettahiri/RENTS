'use client';


import PropTypes from 'prop-types';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import ReviewItem from './review-item';

// ----------------------------------------------------------------------

export default function ReviewList({ reviews, onLike, category, url }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewList, setReviewList] = useState(reviews);
  const reviewsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(reviewList.length / reviewsPerPage);

  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviewList.slice(indexOfFirstReview, indexOfLastReview);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleNewReply = (reviewId, reply) => {
    setReviewList((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId ? { ...review, replies: [...review.replies, reply] } : review
      )
    );
  };

  return (
    <>
      {currentReviews.map((review) => (
        <Box key={review.id}>
          <ReviewItem
            id={review.id}
            name={review.name}
            createdAt={new Date(review.created_at)}
            message={review.message}
            profile_image= {review.profile_image}
            rating={review.rating}
            helpful={review.helpful}
            replies={review.replies}
            onLike={onLike}
            category={category}
            url={url}
            onNewReply={handleNewReply}
          />
        </Box>
      ))}

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{
          mt: 5,
          mb: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
