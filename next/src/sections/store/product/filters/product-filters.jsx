'use client';


import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';

import Rating from '@mui/material/Rating';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import Iconify from 'src/components/iconify';
import FilterPrice from 'src/sections/store/product/filters/filter-price';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function ProductFilters({ open, onClose, canReset, filters, options }) {
  const mdUp = useResponsive('up', 'md');

  const handleFilterGender = useCallback(
    (newValue) => {
      const checked = filters.state.gender.includes(newValue)
        ? filters.state.gender.filter((value) => value !== newValue)
        : [...filters.state.gender, newValue];

      filters.setState({ gender: checked });
    },
    [filters]
  );

  const handleFilterCategory = useCallback(
    (newValue) => {
      filters.setState({ category: newValue });
    },
    [filters]
  );

  const handleFilterStartPrice = useCallback(
    (event) => {
      const newStartPrice = Number(event.target.value);
      filters.setState({ priceRange: { start: newStartPrice, end: filters.state.priceRange.end } });
    },
    [filters]
  );

  const handleFilterEndPrice = useCallback(
    (event) => {
      const newEndPrice = Number(event.target.value);
      filters.setState({ priceRange: { start: filters.state.priceRange.start, end: newEndPrice } });
    },
    [filters]
  );

  const handleFilterRating = useCallback(
    (newValue) => {
      filters.setState({ rating: newValue });
    },
    [filters]
  );

  const handleClearAll = useCallback(() => {
    filters.onResetState();
  }, [filters]);




  const renderHead = (
    <>
      <Box display="flex" alignItems="center" sx={{ py: 2, pr: 1, pl: 2.5 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Filters
        </Typography>

        <Tooltip title="Reset">
          <IconButton onClick={filters.onResetState}>
            <Badge color="error" variant="dot" invisible={!canReset}>
              <Iconify icon="solar:restart-bold" />
            </Badge>
          </IconButton>
        </Tooltip>

        <IconButton onClick={onClose}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />
    </>
  );


  const renderContent = (
    <Stack
      spacing={3}
      alignItems="flex-start"
      sx={{
        flexShrink: 0,
        width: { xs: 1, md: 280 },
      }}
    >
      <Block title="Gender">
        <Box display="flex" flexDirection="column">
          {options.genders.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={filters.state.gender.includes(option.label)}
                  onClick={() => handleFilterGender(option.label)}
                />
              }
              label={option.label}
            />
          ))}
        </Box>
      </Block>

      <Block title="Category">
        <Box display="flex" flexDirection="column">
          {options.categories.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Radio
                  checked={option === filters.state.category}
                  onClick={() => handleFilterCategory(option)}
                />
              }
              label={option}
              sx={{ ...(option === 'all' && { textTransform: 'capitalize' }) }}
            />
          ))}
        </Box>
      </Block>

      <Block title="Price">
        <FilterPrice
          filterPrice={{ start: filters.state.priceRange.start, end: filters.state.priceRange.end }}
          onChangeStartPrice={handleFilterStartPrice}
          onChangeEndPrice={handleFilterEndPrice}
          sx={{ mt: 2 }}
        />
      </Block>

      <Block title="Ratings">
        <Box display="flex" flexDirection="column">
          {options.ratings.map((item, index) => (
            <Box
              key={item}
              onClick={() => handleFilterRating(item)}
              sx={{
                mb: 1,
                gap: 1,
                p: 0.5,
                display: 'flex',
                borderRadius: 1,
                cursor: 'pointer',
                typography: 'body2',
                alignItems: 'center',
                '&:hover': { opacity: 0.48 },
                ...(filters.state.rating === item && { bgcolor: 'action.selected' }),
              }}
            >
              <Rating readOnly value={4 - index} /> & Up
            </Box>
          ))}
        </Box>
      </Block>


    </Stack>
  );

  return (
    <>
      {mdUp ? (
        renderContent
      ) : (
        <Drawer
          anchor="right"
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {

              width: 320,
            },
          }}
        >
            {renderHead}



          <Scrollbar sx={{ px: 2.5, py: 3 }}>
            <Stack spacing={3}>
                {renderContent}
            </Stack>
          </Scrollbar>
        </Drawer>
      )}
    </>
  );
}

ProductFilters.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  canReset: PropTypes.bool.isRequired,
  filters: PropTypes.shape({
    state: PropTypes.shape({
      gender: PropTypes.arrayOf(PropTypes.string).isRequired,
      category: PropTypes.string.isRequired,
      priceRange: PropTypes.shape({
        start: PropTypes.number.isRequired,
        end: PropTypes.number.isRequired,
      }).isRequired,
      rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    setState: PropTypes.func.isRequired,
    onResetState: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.shape({
    genders: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    ratings: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

// ----------------------------------------------------------------------

function Block({ title, children, ...other }) {
  const contentOpen = useBoolean(true);

  return (
    <Stack alignItems="flex-start" sx={{ width: 1 }} {...other}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={contentOpen.onToggle}
        sx={{ width: 1, cursor: 'pointer' }}
      >
        <Typography variant="h6">{title}</Typography>

        <Iconify
          icon={contentOpen.value ? 'carbon:subtract' : 'carbon:add'}
          sx={{ color: 'text.secondary' }}
        />
      </Stack>

      <Collapse unmountOnExit in={contentOpen.value} sx={{ px: 0.5 }}>
        {children}
      </Collapse>
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
