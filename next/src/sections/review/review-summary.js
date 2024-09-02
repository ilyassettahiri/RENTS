import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';

import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

import ReviewProgress from 'src/sections/review/review-progress';

// ----------------------------------------------------------------------

export default function ReviewSummary({ reviewNumber, ratingNumber }) {
  return (
    <Paper variant="outlined" sx={{ p: 4, pr: 3, borderRadius: 2 }}>
      <Stack spacing={3}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Typography variant="h1"> {ratingNumber}</Typography>

          <Stack spacing={0.5}>
            <Rating value={ratingNumber} readOnly precision={0.1} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {fShortenNumber(reviewNumber)} reviews
            </Typography>
          </Stack>
        </Stack>

        <RadioGroup>
          <ReviewProgress />
        </RadioGroup>


      </Stack>
    </Paper>
  );
}

ReviewSummary.propTypes = {
  ratingNumber: PropTypes.number,
  reviewNumber: PropTypes.number,
};
