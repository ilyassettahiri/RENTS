import { useCallback } from 'react';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import { useTranslation } from 'react-i18next';

import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';
import PropTypes from 'prop-types';
import FilterPrice from 'src/sections/store/product/filters/filter-price';
import { useBoolean } from 'src/hooks/use-boolean';

import { varAlpha } from 'src/theme/styles';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export function ProductFilters({ open, onOpen, onClose, canReset, filters, options }) {
  const marksLabel = [...Array(21)].map((_, index) => {
    const value = index * 10;

    const firstValue = index === 0 ? `$${value}` : `${value}`;

    return { value, label: index % 4 ? '' : firstValue };
  });

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

  const { t } = useTranslation();




  const handleFilterStartPrice = useCallback(
    (event) => {
      const newStartPrice = Number(event.target.value);
      filters.setState({ priceRange: { start: newStartPrice, end: filters.state.priceRange.end } }); // Fix update
    },
    [filters]
  );

  const handleFilterEndPrice = useCallback(
    (event) => {
      const newEndPrice = Number(event.target.value);
      filters.setState({ priceRange: { start: filters.state.priceRange.start, end: newEndPrice } }); // Fix update
    },
    [filters]
  );


  const handleFilterRating = useCallback(
    (newValue) => {
      filters.setState({ rating: newValue });
    },
    [filters]
  );

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

  const renderGender = (


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

  );

  const renderCategory = (


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


  );

  const renderPrice = (

    <Block title="Price">


        <Box display="flex" flexDirection="column">

          <FilterPrice
            filterPrice={{ start: filters.state.priceRange[0], end: filters.state.priceRange[1] }}
            onChangeStartPrice={handleFilterStartPrice}
            onChangeEndPrice={handleFilterEndPrice}
            sx={{ my: 2, alignSelf: 'center', width: '100%' }}
          />
        </Box>

    </Block>


  );

  const renderRating = (


    <Block title="Rating">


          <Box display="flex" flexDirection="column">


            {options.ratings.map((item, index) => (
              <Box
                key={item}
                onClick={() => handleFilterRating(item)}
                sx={{
                  mb: 1,
                  gap: 1,
                  ml: -1,
                  p: 0.5,
                  display: 'flex',
                  borderRadius: 1,
                  cursor: 'pointer',
                  typography: 'body2',
                  alignItems: 'center',
                  '&:hover': { opacity: 0.48 },
                  ...(filters.state.rating === item && {
                    bgcolor: 'action.selected',
                  }),
                }}
              >
                <Rating readOnly value={4 - index} /> & Up
              </Box>
            ))}
          </Box>

    </Block>


  );

  return (
    <>
      <Button
        disableRipple
        color="primary"
        variant="contained"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpen}
      >
        {t('filters')}
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        {renderHead}

        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {renderGender}
            {renderCategory}
            {renderPrice}
            {renderRating}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

ProductFilters.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  canReset: PropTypes.bool.isRequired,
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
