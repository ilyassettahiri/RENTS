import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';

import { varAlpha } from 'src/theme/styles';
import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

export function ProductFiltersResult({ filters, totalResults, sx }) {
  const handleRemoveGender = (inputValue) => {
    const newValue = filters.state.gender.filter((item) => item !== inputValue);
    filters.setState({ gender: newValue });
  };

  const handleRemoveCategory = () => {
    filters.setState({ category: 'all' });
  };

  const handleRemovePrice = () => {
    filters.setState({ priceRange: [0, 200] });
  };

  const handleRemoveRating = () => {
    filters.setState({ rating: '' });
  };

  return (
    <FiltersResult totalResults={totalResults} onReset={filters.onResetState} sx={sx}>
      <FiltersBlock label="Gender:" isShow={!!filters.state.gender.length}>
        {filters.state.gender.map((item) => (
          <Chip {...chipProps} key={item} label={item} onDelete={() => handleRemoveGender(item)} />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Category:" isShow={filters.state.category !== 'all'}>
        <Chip {...chipProps} label={filters.state.category} onDelete={handleRemoveCategory} />
      </FiltersBlock>

      <FiltersBlock
        label="Price:"
        isShow={filters.state.priceRange[0] !== 0 || filters.state.priceRange[1] !== 200}
      >
        <Chip
          {...chipProps}
          label={`$${filters.state.priceRange[0]} - ${filters.state.priceRange[1]}`}
          onDelete={handleRemovePrice}
        />
      </FiltersBlock>

      <FiltersBlock label="Rating:" isShow={!!filters.state.rating}>
        <Chip {...chipProps} label={filters.state.rating} onDelete={handleRemoveRating} />
      </FiltersBlock>
    </FiltersResult>
  );
}

ProductFiltersResult.propTypes = {
  filters: PropTypes.shape({
    state: PropTypes.shape({
      gender: PropTypes.arrayOf(PropTypes.string).isRequired,
      category: PropTypes.string.isRequired,
      priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
      rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    setState: PropTypes.func.isRequired,
    onResetState: PropTypes.func.isRequired,
  }).isRequired,
  totalResults: PropTypes.number.isRequired,
  sx: PropTypes.object,
};
