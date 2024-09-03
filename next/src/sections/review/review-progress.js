import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import RadioGroup from '@mui/material/RadioGroup';
import ReviewProgressItem from 'src/sections/review/review-progress-item';

// ----------------------------------------------------------------------

export default function ReviewProgress({ reviewDistribution, ...other }) {
  const totals = reviewDistribution.reduce((acc, curr) => acc + curr.number, 0);

  return (
    <RadioGroup>
      <Stack spacing={2} {...other}>
        {reviewDistribution.map((rating, index) => (
          <ReviewProgressItem key={rating.value} rating={rating} index={index} totals={totals} />
        ))}
      </Stack>
    </RadioGroup>
  );
}

ReviewProgress.propTypes = {
  reviewDistribution: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      number: PropTypes.number,
    })
  ).isRequired,
};
