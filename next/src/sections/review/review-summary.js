'use client';


import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import { fShortenNumber } from 'src/utils/format-number';
import ReviewProgress from 'src/sections/review/review-progress';

// ----------------------------------------------------------------------

export default function ReviewSummary({ reviewNumber, reviews }) {

  const { t } = useTranslation();

  // Calculate the average rating
  const ratingNumber = reviews.length
    ? reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0) / reviews.length
    : 0;

  // Calculate the number of reviews for each star level (1 to 5)
  const reviewDistribution = [5, 4, 3, 2, 1].map((star) => ({
    value: `${star}star`,
    number: reviews.filter((review) => Math.round(review.rating) === star).length,
  }));

  return (
    <Paper variant="outlined" sx={{ p: 4, pr: 3, borderRadius: 2 }}>
      <Stack spacing={3}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Typography variant="h1">{ratingNumber.toFixed(1)}</Typography>

          <Stack spacing={0.5}>
            <Rating value={ratingNumber} readOnly precision={0.1} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {fShortenNumber(reviewNumber)} {t('Reviews')}
            </Typography>
          </Stack>
        </Stack>

        <RadioGroup>
          <ReviewProgress reviewDistribution={reviewDistribution} />
        </RadioGroup>
      </Stack>
    </Paper>
  );
}

ReviewSummary.propTypes = {
  reviews: PropTypes.array.isRequired, // Updated to require reviews array
  reviewNumber: PropTypes.number.isRequired,
};
